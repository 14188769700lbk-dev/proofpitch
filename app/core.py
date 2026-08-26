from __future__ import annotations

import re
from datetime import datetime, timezone

from app.models import (
    ApprovalGate,
    Assessment,
    EvidenceItem,
    EvidenceMatch,
    Opportunity,
    RiskReview,
    TimelineStep,
)


HARD_RISK_PATTERNS: dict[str, tuple[str, ...]] = {
    "upfront payment": ("pay to apply", "upfront fee", "training fee", "registration fee"),
    "gift card request": ("gift card", "itunes card", "steam card"),
    "crypto transfer": ("crypto deposit", "send usdc", "send bitcoin", "wallet deposit"),
    "suspicious equipment check": ("cash the check", "equipment check", "buy equipment from our vendor"),
}

OFF_PLATFORM_PATTERNS = (
    "telegram only",
    "contact on telegram",
    "whatsapp only",
    "contact on whatsapp",
)


def normalize(text: str) -> str:
    return re.sub(r"[^a-z0-9+#.]+", " ", text.lower()).strip()


def _candidate_terms(name: str, aliases: list[str]) -> set[str]:
    values = aliases or [name]
    return {normalize(value) for value in values if normalize(value)}


def match_evidence(
    opportunity: Opportunity, evidence_items: list[EvidenceItem]
) -> list[EvidenceMatch]:
    matches: list[EvidenceMatch] = []
    for requirement in opportunity.requirements:
        terms = _candidate_terms(requirement.name, requirement.aliases)
        best: tuple[int, EvidenceItem] | None = None
        for evidence in evidence_items:
            if not evidence.public_verified:
                continue
            haystack = normalize(" ".join([evidence.title, evidence.summary, *evidence.skills]))
            matched_terms = [term for term in terms if term in haystack]
            if requirement.match_all and len(matched_terms) != len(terms):
                score = 0
            else:
                score = len(matched_terms)
            if score and (best is None or score > best[0]):
                best = (score, evidence)

        if best:
            evidence = best[1]
            matches.append(
                EvidenceMatch(
                    requirement=requirement.name,
                    public_evidence=evidence.title,
                    evidence_url=evidence.url,
                    decision="Verified",
                    rationale=f"Public artifact contains matching evidence for {requirement.name}.",
                )
            )
        else:
            decision = "Disclose gap" if requirement.required else "Optional gap"
            matches.append(
                EvidenceMatch(
                    requirement=requirement.name,
                    public_evidence="No public evidence",
                    decision=decision,
                    rationale="No supplied public artifact supports this requirement.",
                )
            )
    return matches


def scan_risks(opportunity: Opportunity) -> RiskReview:
    text = normalize(f"{opportunity.title} {opportunity.company} {opportunity.description}")
    blockers: list[str] = []
    notes: list[str] = []

    for label, patterns in HARD_RISK_PATTERNS.items():
        if any(pattern in text for pattern in patterns):
            blockers.append(label)

    off_platform = any(pattern in text for pattern in OFF_PLATFORM_PATTERNS)
    if off_platform:
        blockers.append("off-platform-only contact")

    employer_status = "verified" if opportunity.source_verified else "pending"
    if employer_status != "verified":
        notes.append("Employer identity must be independently verified before any application is sent.")

    return RiskReview(
        employer_verification=employer_status,
        payment_request="detected" if blockers and any("payment" in item or "card" in item or "crypto" in item for item in blockers) else "none",
        off_platform_contact="detected" if off_platform else "none",
        blockers=blockers,
        notes=notes,
    )


def compose_draft(opportunity: Opportunity, matches: list[EvidenceMatch]) -> str:
    verified = [match for match in matches if match.decision == "Verified"]
    gaps = [match.requirement for match in matches if match.decision == "Disclose gap"]

    proof_sentence = " ".join(
        f"For {match.requirement}, my public work includes {match.public_evidence}."
        for match in verified[:2]
    )
    gap_sentence = (
        f"I do not currently have public evidence for {', '.join(gaps)}; I would treat that as an explicit ramp-up area rather than claim prior experience."
        if gaps
        else "The listed core requirements are supported by the public artifacts linked in my profile."
    )
    return (
        "Hi Hiring Team,\n\n"
        f"I am interested in the {opportunity.title} opportunity. {proof_sentence}\n\n"
        f"{gap_sentence}\n\n"
        "I work with reviewable changes, reproducible tests, and explicit approval gates before any external write. "
        "If that matches your process, I would start with one small, verifiable milestone and share the evidence before expanding scope.\n\n"
        "Best,\n[Your name]"
    )


def compose_blocked_notice(risk_review: RiskReview) -> str:
    reasons = ", ".join(risk_review.blockers)
    return (
        "Application draft withheld.\n\n"
        f"ProofPitch detected hard risk signals: {reasons}.\n\n"
        "Do not contact this listing, pay any fee, move the conversation off-platform, "
        "or request human approval unless every blocker is independently resolved."
    )


def build_assessment(
    opportunity: Opportunity,
    evidence_items: list[EvidenceItem],
    *,
    runtime: str,
) -> Assessment:
    matches = match_evidence(opportunity, evidence_items)
    risk_review = scan_risks(opportunity)
    required_gaps = [item for item in matches if item.decision == "Disclose gap"]

    if risk_review.blockers:
        verdict = "Do not apply"
        summary = "A hard safety signal blocks this opportunity. Do not continue without resolving it."
        gate = ApprovalGate(
            state="blocked",
            reason="Hard risk signals must be resolved before human approval can be requested.",
        )
    elif required_gaps or risk_review.employer_verification != "verified":
        verdict = "Apply with caveat"
        gap_names = ", ".join(item.requirement for item in required_gaps)
        gap_text = f" {gap_names} remains an explicit gap." if gap_names else ""
        summary = f"Strong evidence exists for the core build skills.{gap_text}".strip()
        gate = ApprovalGate(
            state="required",
            reason="A human must verify the employer, review disclosures, and approve the exact draft.",
        )
    else:
        verdict = "Ready for review"
        summary = "Every required skill is backed by a supplied public artifact; human review is still mandatory."
        gate = ApprovalGate(
            state="required",
            reason="ProofPitch never sends applications without human approval.",
        )

    blocked = bool(risk_review.blockers)
    return Assessment(
        opportunity=opportunity,
        verdict=verdict,
        summary=summary,
        evidence_matrix=matches,
        risk_review=risk_review,
        application_draft=(
            compose_blocked_notice(risk_review)
            if blocked
            else compose_draft(opportunity, matches)
        ),
        approval_gate=gate,
        timeline=[
            TimelineStep(label="Listing parsed", detail="Requirements extracted into a reviewable schema."),
            TimelineStep(label="Portfolio matched", detail="Only public, supplied artifacts were considered."),
            TimelineStep(
                label="Risk gate checked",
                detail="Hard payment and off-platform contact patterns were evaluated.",
                state="blocked" if blocked else "complete",
            ),
            TimelineStep(
                label="Draft withheld" if blocked else "Draft prepared",
                detail=(
                    "No application draft is produced while hard risk signals remain."
                    if blocked
                    else "Claims are limited to matched evidence; gaps stay visible."
                ),
                state="blocked" if blocked else "complete",
            ),
        ],
        generated_at=datetime.now(timezone.utc),
        runtime=runtime,
    )
