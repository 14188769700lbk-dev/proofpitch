export type Requirement = {
  name: string;
  aliases: string[];
  required: boolean;
};

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  engagement: string;
  level: string;
  description: string;
  requirements: Requirement[];
  source_url?: string | null;
  source_verified: boolean;
  sample_only: boolean;
};

export type EvidenceMatch = {
  requirement: string;
  public_evidence: string;
  evidence_url?: string | null;
  decision: "Verified" | "Disclose gap" | "Optional gap";
  rationale: string;
};

export type RiskReview = {
  employer_verification: "verified" | "pending" | "unverified";
  payment_request: "none" | "detected";
  off_platform_contact: "none" | "detected";
  blockers: string[];
  notes: string[];
};

export type TimelineStep = {
  label: string;
  detail: string;
  state: "complete" | "blocked";
};

export type Assessment = {
  opportunity: Opportunity;
  verdict: "Ready for review" | "Apply with caveat" | "Do not apply";
  summary: string;
  evidence_matrix: EvidenceMatch[];
  risk_review: RiskReview;
  application_draft: string;
  approval_gate: {
    state: "required" | "blocked" | "recorded";
    external_send: false;
    reason: string;
  };
  timeline: TimelineStep[];
  generated_at: string;
  runtime: string;
};

export type DemoPayload = {
  opportunities: Opportunity[];
  assessment: Assessment;
  disclaimer: string;
};

