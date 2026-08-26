from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

from app.agent import ProofPitchAgent
from app.models import ApprovalRecord, ApprovalRequest, AssessRequest
from app.store import load_demo_data


app = FastAPI(
    title="ProofPitch",
    version="0.1.0",
    description="Evidence-grounded opportunity screening with a mandatory human approval gate.",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "http://localhost:5173"],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["content-type"],
)

opportunities, evidence_items = load_demo_data()
opportunity_index = {item.id: item for item in opportunities}
proofpitch = ProofPitchAgent()


@app.get("/api/health")
def health() -> dict[str, object]:
    return {
        "status": "ok",
        "external_send_enabled": False,
        "runtime": "Strands Agents SDK 1.53.0",
    }


@app.get("/api/demo")
def demo() -> dict[str, object]:
    assessment = proofpitch.assess(opportunities[0], evidence_items)
    return {
        "opportunities": [item.model_dump(mode="json") for item in opportunities],
        "assessment": assessment.model_dump(mode="json"),
        "disclaimer": "Synthetic listings are used for the public demo. No application is sent.",
    }


@app.post("/api/assess")
def assess(request: AssessRequest) -> dict[str, object]:
    opportunity = opportunity_index.get(request.opportunity_id)
    if opportunity is None:
        raise HTTPException(status_code=404, detail="Unknown demo opportunity")
    return proofpitch.assess(opportunity, evidence_items).model_dump(mode="json")


@app.post("/api/approval", response_model=ApprovalRecord)
def record_approval(request: ApprovalRequest) -> ApprovalRecord:
    opportunity = opportunity_index.get(request.opportunity_id)
    if opportunity is None:
        raise HTTPException(status_code=404, detail="Unknown demo opportunity")
    assessment = proofpitch.assess(opportunity, evidence_items)
    if assessment.approval_gate.state == "blocked":
        raise HTTPException(
            status_code=409,
            detail="Approval is blocked while hard risk signals remain.",
        )
    return ApprovalRecord(
        opportunity_id=request.opportunity_id,
        message="Human review recorded locally. No external application was sent.",
    )


frontend_dist = Path(__file__).resolve().parents[1] / "frontend" / "dist"
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
else:
    @app.get("/")
    def frontend_missing() -> JSONResponse:
        return JSONResponse(
            status_code=503,
            content={"detail": "Frontend build missing. Run npm ci && npm run build in frontend/."},
        )
