from app.core import build_assessment, scan_risks
from app.models import EvidenceItem, Opportunity, Requirement


def opportunity(description: str, verified: bool = False) -> Opportunity:
    return Opportunity(
        id="test",
        title="Junior API Engineer",
        company="Example",
        engagement="Contract",
        level="Junior",
        description=description,
        requirements=[
            Requirement(name="Python", aliases=["python"]),
            Requirement(name="MLflow", aliases=["mlflow"]),
        ],
        source_verified=verified,
    )


def evidence() -> list[EvidenceItem]:
    return [
        EvidenceItem(
            id="python",
            title="Public Python service",
            summary="A tested Python API.",
            url="https://example.com/proof",
            skills=["python", "api"],
        )
    ]


def test_assessment_discloses_unsupported_skill() -> None:
    result = build_assessment(opportunity("Normal platform application."), evidence(), runtime="test")
    decisions = {row.requirement: row.decision for row in result.evidence_matrix}
    assert decisions == {"Python": "Verified", "MLflow": "Disclose gap"}
    assert "do not currently have public evidence for MLflow" in result.application_draft
    assert result.verdict == "Apply with caveat"
    assert result.approval_gate.external_send is False


def test_compound_requirement_requires_every_alias() -> None:
    candidate = opportunity("Normal platform application.")
    candidate.requirements = [
        Requirement(name="Python + FastAPI", aliases=["python", "fastapi"], match_all=True)
    ]
    result = build_assessment(candidate, evidence(), runtime="test")
    assert result.evidence_matrix[0].decision == "Disclose gap"


def test_hard_payment_signal_blocks_application() -> None:
    result = build_assessment(
        opportunity("Pay to apply with a registration fee."), evidence(), runtime="test"
    )
    assert result.verdict == "Do not apply"
    assert result.approval_gate.state == "blocked"
    assert "upfront payment" in result.risk_review.blockers


def test_off_platform_only_contact_is_blocked() -> None:
    risks = scan_risks(opportunity("Contact on Telegram only."))
    assert risks.off_platform_contact == "detected"
    assert "off-platform-only contact" in risks.blockers
