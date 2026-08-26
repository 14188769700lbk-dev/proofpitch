from app.agent import ProofPitchAgent
from app.store import load_demo_data


def test_strands_direct_tool_workflow_is_credential_free() -> None:
    opportunities, evidence = load_demo_data()
    result = ProofPitchAgent().assess(opportunities[0], evidence)
    assert result.runtime.startswith("Strands Agents SDK 1.53.0")
    assert len(result.evidence_matrix) == 3
    assert result.evidence_matrix[0].decision == "Verified"
    assert result.evidence_matrix[-1].decision == "Disclose gap"
    assert result.approval_gate.external_send is False


def test_demo_scam_fixture_is_blocked_before_human_approval() -> None:
    opportunities, evidence = load_demo_data()
    result = ProofPitchAgent().assess(opportunities[-1], evidence)
    assert result.opportunity.id == "suspicious-setup-assistant"
    assert result.verdict == "Do not apply"
    assert result.approval_gate.state == "blocked"
    assert result.risk_review.payment_request == "detected"
    assert result.risk_review.off_platform_contact == "detected"
    assert result.application_draft.startswith("Application draft withheld.")
    assert "Hi Hiring Team" not in result.application_draft
    assert result.timeline[-1].label == "Draft withheld"
    assert result.timeline[-1].state == "blocked"
