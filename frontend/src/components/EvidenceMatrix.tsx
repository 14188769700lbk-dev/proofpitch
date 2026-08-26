import type { EvidenceMatch } from "../types";
import { AlertIcon, CheckIcon, ExternalIcon, InfoIcon } from "./Icons";

type Props = { rows: EvidenceMatch[] };

export function EvidenceMatrix({ rows }: Props) {
  return (
    <section className="evidence-section" id="evidence" aria-labelledby="evidence-title">
      <h2 className="sr-only" id="evidence-title">Evidence matrix</h2>
      <div className="evidence-table" role="table" aria-label="Requirement evidence decisions">
        <div className="table-row table-header" role="row">
          <span role="columnheader">Requirement</span>
          <span role="columnheader">Public evidence</span>
          <span role="columnheader">Decision</span>
        </div>
        {rows.map((row) => (
          <div className="table-row" role="row" key={row.requirement}>
            <span className="cell requirement" role="cell" data-label="Requirement">{row.requirement}</span>
            <span className="cell evidence" role="cell" data-label="Public evidence">
              {row.evidence_url ? (
                <a href={row.evidence_url} target="_blank" rel="noreferrer">
                  {row.public_evidence}<ExternalIcon />
                </a>
              ) : row.public_evidence}
            </span>
            <span className="cell decision" role="cell" data-label="Decision">
              <span className={`decision-tag ${row.decision === "Verified" ? "verified" : "gap"}`}>
                {row.decision === "Verified" ? <CheckIcon /> : <AlertIcon />}
                {row.decision}
              </span>
            </span>
          </div>
        ))}
      </div>
      <p className="evidence-note"><InfoIcon />Decisions use only public evidence supplied to the run.</p>
    </section>
  );
}

