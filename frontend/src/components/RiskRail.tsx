import type { RiskReview } from "../types";
import { BuildingIcon, CardIcon, ChevronIcon, LockIcon, ReviewIcon, ShieldIcon } from "./Icons";

type Props = { review: RiskReview };

function valueClass(value: string) {
  return value === "none" || value === "verified" ? "safe" : value === "pending" ? "pending" : "blocked";
}

export function RiskRail({ review }: Props) {
  const checks = [
    { label: "Employer verification", value: review.employer_verification, icon: BuildingIcon },
    { label: "Payment request", value: review.payment_request, icon: CardIcon },
    { label: "Off-platform contact", value: review.off_platform_contact, icon: ReviewIcon },
  ];
  return (
    <aside className="risk-rail" aria-labelledby="risk-heading">
      <h2 id="risk-heading"><ShieldIcon />Risk review</h2>
      <div className="risk-list">
        {checks.map(({ label, value, icon: Icon }) => (
          <div className="risk-row" key={label}>
            <span className="risk-icon"><Icon /></span>
            <span><strong>{label}</strong><small className={valueClass(value)}>{value}</small></span>
            <ChevronIcon />
          </div>
        ))}
      </div>
      <div className="risk-principle">
        <span className="risk-icon"><LockIcon /></span>
        <p>Hard payment or off-platform-only signals stop the workflow.</p>
      </div>
      {review.blockers.length > 0 && (
        <div className="blocker-box">
          <strong>Blocked</strong>
          <p>{review.blockers.join(", ")}</p>
        </div>
      )}
    </aside>
  );
}

