from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class Requirement(BaseModel):
    name: str
    aliases: list[str] = Field(default_factory=list)
    required: bool = True
    match_all: bool = False


class Opportunity(BaseModel):
    id: str
    title: str
    company: str
    engagement: str
    level: str
    description: str
    requirements: list[Requirement]
    source_url: str | None = None
    source_verified: bool = False
    sample_only: bool = False


class EvidenceItem(BaseModel):
    id: str
    title: str
    summary: str
    url: str
    skills: list[str]
    public_verified: bool = True


class EvidenceMatch(BaseModel):
    requirement: str
    public_evidence: str
    evidence_url: str | None = None
    decision: Literal["Verified", "Disclose gap", "Optional gap"]
    rationale: str


class RiskReview(BaseModel):
    employer_verification: Literal["verified", "pending", "unverified"]
    payment_request: Literal["none", "detected"]
    off_platform_contact: Literal["none", "detected"]
    blockers: list[str] = Field(default_factory=list)
    notes: list[str] = Field(default_factory=list)


class TimelineStep(BaseModel):
    label: str
    detail: str
    state: Literal["complete", "blocked"] = "complete"


class ApprovalGate(BaseModel):
    state: Literal["required", "blocked", "recorded"]
    external_send: bool = False
    reason: str


class Assessment(BaseModel):
    opportunity: Opportunity
    verdict: Literal["Ready for review", "Apply with caveat", "Do not apply"]
    summary: str
    evidence_matrix: list[EvidenceMatch]
    risk_review: RiskReview
    application_draft: str
    approval_gate: ApprovalGate
    timeline: list[TimelineStep]
    generated_at: datetime
    runtime: str


class AssessRequest(BaseModel):
    opportunity_id: str


class ApprovalRequest(BaseModel):
    opportunity_id: str
    draft: str = Field(min_length=40, max_length=5000)


class ApprovalRecord(BaseModel):
    opportunity_id: str
    state: Literal["recorded"] = "recorded"
    external_send: bool = False
    message: str
