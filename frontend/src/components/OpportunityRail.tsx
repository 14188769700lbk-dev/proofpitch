import type { Opportunity } from "../types";
import { BriefcaseIcon, ChevronIcon } from "./Icons";

type Props = {
  opportunities: Opportunity[];
  selectedId: string;
  busy: boolean;
  onSelect: (id: string) => void;
};

export function OpportunityRail({ opportunities, selectedId, busy, onSelect }: Props) {
  return (
    <aside className="opportunity-rail" id="queue">
      <div className="rail-heading">
        <h2>Opportunity inbox</h2>
        <span aria-label="Synthetic fixtures" title="Synthetic fixtures">{opportunities.length}</span>
      </div>
      <div className="opportunity-list">
        {opportunities.map((opportunity) => {
          const selected = opportunity.id === selectedId;
          return (
            <button
              className={`opportunity-row ${selected ? "selected" : ""}`}
              type="button"
              key={opportunity.id}
              disabled={busy}
              aria-pressed={selected}
              onClick={() => onSelect(opportunity.id)}
            >
              <span className="opportunity-icon"><BriefcaseIcon /></span>
              <span className="opportunity-copy">
                <strong>{opportunity.title}</strong>
                <small>{opportunity.engagement} · {opportunity.level}</small>
              </span>
              <ChevronIcon className="row-chevron" />
            </button>
          );
        })}
      </div>
      <p className="fixture-note">Synthetic listings for a reproducible demo. No employer is contacted.</p>
    </aside>
  );
}
