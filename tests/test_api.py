from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_proves_external_send_is_disabled() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["external_send_enabled"] is False


def test_demo_returns_reviewable_assessment() -> None:
    response = client.get("/api/demo")
    assert response.status_code == 200
    payload = response.json()
    assert len(payload["opportunities"]) == 4
    assert payload["assessment"]["approval_gate"]["state"] == "required"
    assert payload["assessment"]["approval_gate"]["external_send"] is False


def test_local_approval_never_sends_application() -> None:
    response = client.post(
        "/api/approval",
        json={
            "opportunity_id": "model-card-engineer",
            "draft": "A sufficiently long draft that has been reviewed by a human before any external action.",
        },
    )
    assert response.status_code == 200
    assert response.json()["state"] == "recorded"
    assert response.json()["external_send"] is False


def test_blocked_opportunity_cannot_record_approval_through_api() -> None:
    response = client.post(
        "/api/approval",
        json={
            "opportunity_id": "suspicious-setup-assistant",
            "draft": "This direct request must not bypass the hard risk gate in the service.",
        },
    )
    assert response.status_code == 409
    assert response.json()["detail"] == "Approval is blocked while hard risk signals remain."
