from __future__ import annotations

import json
from typing import Any

from strands import Agent, tool
from strands.models import BedrockModel

from app.core import (
    build_assessment,
    compose_blocked_notice,
    compose_draft,
    match_evidence,
    scan_risks,
)
from app.models import Assessment, EvidenceItem, EvidenceMatch, Opportunity, RiskReview


@tool
def parse_opportunity(listing_json: str) -> dict[str, Any]:
    """Validate an opportunity listing and return its structured fields.

    Args:
        listing_json: JSON representation of an opportunity listing.
    """
    opportunity = Opportunity.model_validate_json(listing_json)
    return opportunity.model_dump(mode="json")


@tool
def match_public_evidence(
    opportunity_json: str, evidence_json: str
) -> list[dict[str, Any]]:
    """Match requirements only against supplied, public, verified portfolio evidence.

    Args:
        opportunity_json: JSON representation of a validated opportunity.
        evidence_json: JSON list of public portfolio evidence items.
    """
    opportunity = Opportunity.model_validate_json(opportunity_json)
    evidence = [EvidenceItem.model_validate(item) for item in json.loads(evidence_json)]
    return [item.model_dump(mode="json") for item in match_evidence(opportunity, evidence)]


@tool
def check_risk_signals(opportunity_json: str) -> dict[str, Any]:
    """Check an opportunity for payment, crypto, suspicious-check, and off-platform-only signals.

    Args:
        opportunity_json: JSON representation of a validated opportunity.
    """
    opportunity = Opportunity.model_validate_json(opportunity_json)
    return scan_risks(opportunity).model_dump(mode="json")


@tool
def prepare_application_draft(
    opportunity_json: str, evidence_matches_json: str, risk_review_json: str
) -> dict[str, str]:
    """Draft from matched evidence, or withhold the draft when hard risks remain.

    Args:
        opportunity_json: JSON representation of a validated opportunity.
        evidence_matches_json: JSON list of requirement-to-evidence matches.
        risk_review_json: JSON representation of the completed risk review.
    """
    opportunity = Opportunity.model_validate_json(opportunity_json)
    matches = [EvidenceMatch.model_validate(item) for item in json.loads(evidence_matches_json)]
    risks = RiskReview.model_validate_json(risk_review_json)
    return {
        "draft": (
            compose_blocked_notice(risks)
            if risks.blockers
            else compose_draft(opportunity, matches)
        )
    }


def _unwrap_tool_result(result: dict[str, Any]) -> Any:
    if result.get("status") != "success":
        raise RuntimeError(f"Strands tool failed: {result}")
    content = result.get("content", [])
    if not content or "text" not in content[0]:
        raise RuntimeError(f"Unexpected Strands tool response: {result}")
    return json.loads(content[0]["text"])


class ProofPitchAgent:
    """Strands-backed workflow with a deterministic, credential-free replay path."""

    def __init__(self) -> None:
        self.agent = Agent(
            model=BedrockModel(model_id="us.amazon.nova-lite-v1:0", temperature=0.1),
            tools=[
                parse_opportunity,
                match_public_evidence,
                check_risk_signals,
                prepare_application_draft,
            ],
            system_prompt=(
                "You are ProofPitch. Use only supplied public evidence, disclose every gap, "
                "stop on payment or off-platform-only risk signals, and never send an application. "
                "Your output is always a draft awaiting human approval."
            ),
            callback_handler=None,
        )

    def assess(self, opportunity: Opportunity, evidence: list[EvidenceItem]) -> Assessment:
        """Run all four registered Strands tools without invoking a paid model."""
        parsed = Opportunity.model_validate(
            _unwrap_tool_result(
                self.agent.tool.parse_opportunity(listing_json=opportunity.model_dump_json())
            )
        )
        evidence_payload = json.dumps(
            [item.model_dump(mode="json") for item in evidence], ensure_ascii=False
        )
        matches = [
            EvidenceMatch.model_validate(item)
            for item in _unwrap_tool_result(
                self.agent.tool.match_public_evidence(
                    opportunity_json=parsed.model_dump_json(),
                    evidence_json=evidence_payload,
                )
            )
        ]
        risks = RiskReview.model_validate(
            _unwrap_tool_result(
                self.agent.tool.check_risk_signals(opportunity_json=parsed.model_dump_json())
            )
        )
        draft_payload = _unwrap_tool_result(
            self.agent.tool.prepare_application_draft(
                opportunity_json=parsed.model_dump_json(),
                evidence_matches_json=json.dumps(
                    [item.model_dump(mode="json") for item in matches], ensure_ascii=False
                ),
                risk_review_json=risks.model_dump_json(),
            )
        )

        assessment = build_assessment(
            parsed,
            evidence,
            runtime="Strands Agents SDK 1.53.0 · deterministic direct-tool replay",
        )
        assessment.evidence_matrix = matches
        assessment.risk_review = risks
        assessment.application_draft = draft_payload["draft"]
        return assessment

    def run_live(self, opportunity: Opportunity, evidence: list[EvidenceItem]) -> str:
        """Invoke the Strands model loop with Bedrock when AWS credentials are configured."""
        prompt = (
            "Assess this opportunity using every registered tool in order. Return a concise review, "
            "but do not send anything.\n\nOpportunity:\n"
            f"{opportunity.model_dump_json(indent=2)}\n\nPublic evidence:\n"
            f"{json.dumps([item.model_dump(mode='json') for item in evidence], indent=2)}"
        )
        return str(self.agent(prompt))
