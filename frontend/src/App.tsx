import { useEffect, useState } from "react";
import { assessOpportunity, loadDemo, recordApproval } from "./api";
import { DraftEditor } from "./components/DraftEditor";
import { EvidenceMatrix } from "./components/EvidenceMatrix";
import { Header } from "./components/Header";
import { OpportunityRail } from "./components/OpportunityRail";
import { RiskRail } from "./components/RiskRail";
import { Timeline } from "./components/Timeline";
import { CheckIcon, ShieldIcon } from "./components/Icons";
import type { Assessment, Opportunity } from "./types";

export default function App() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(true);
  const [error, setError] = useState("");
  const [approvalMessage, setApprovalMessage] = useState("");

  useEffect(() => {
    loadDemo()
      .then((payload) => {
        setOpportunities(payload.opportunities);
        setAssessment(payload.assessment);
        setDraft(payload.assessment.application_draft);
      })
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "Unable to load the demo."))
      .finally(() => setBusy(false));
  }, []);

  async function runAssessment(opportunityId = assessment?.opportunity.id) {
    if (!opportunityId) return;
    setBusy(true);
    setError("");
    setApprovalMessage("");
    try {
      const next = await assessOpportunity(opportunityId);
      setAssessment(next);
      setDraft(next.application_draft);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Assessment failed.");
    } finally {
      setBusy(false);
    }
  }

  async function approve() {
    if (!assessment) return;
    setBusy(true);
    setApprovalMessage("");
    try {
      const record = await recordApproval(assessment.opportunity.id, draft);
      setApprovalMessage(record.message);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Approval could not be recorded.");
    } finally {
      setBusy(false);
    }
  }

  if (!assessment) {
    return (
      <div className="loading-screen">
        <strong>ProofPitch</strong>
        <p>{error || "Preparing the evidence workspace…"}</p>
      </div>
    );
  }

  const isBlocked = assessment.approval_gate.state === "blocked";
  const verdictClass = assessment.verdict === "Do not apply" ? "blocked" : assessment.verdict === "Ready for review" ? "ready" : "caveat";

  return (
    <div className="app">
      <Header busy={busy} onRun={() => runAssessment()} />
      {error && <div className="error-banner" role="alert">{error}</div>}
      <div className="workspace-grid">
        <OpportunityRail opportunities={opportunities} selectedId={assessment.opportunity.id} busy={busy} onSelect={runAssessment} />
        <main className="main-workspace">
          <div className="workspace-heading">
            <h1>One honest application, ready for review</h1>
            <div className={`verdict ${verdictClass}`}>
              <span className="verdict-icon">{verdictClass === "blocked" ? <ShieldIcon /> : <CheckIcon />}</span>
              <div><h2>{assessment.verdict}</h2><p>{assessment.summary}</p></div>
            </div>
          </div>
          <EvidenceMatrix rows={assessment.evidence_matrix} />
          <DraftEditor
            draft={draft}
            disabled={isBlocked || busy}
            approvalMessage={approvalMessage}
            onDraftChange={setDraft}
            onApprove={approve}
          />
          <p className="runtime-note">{assessment.runtime}</p>
        </main>
        <RiskRail review={assessment.risk_review} />
        <Timeline steps={assessment.timeline} />
      </div>
    </div>
  );
}
