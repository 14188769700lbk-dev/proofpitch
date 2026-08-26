import type { TimelineStep } from "../types";
import { AlertIcon, CheckIcon } from "./Icons";

type Props = { steps: TimelineStep[] };

export function Timeline({ steps }: Props) {
  return (
    <section className="timeline" aria-label="Assessment timeline">
      <div className="timeline-spine" />
      {steps.map((step) => (
        <div className={`timeline-step ${step.state}`} key={step.label}>
          <span className="timeline-marker">{step.state === "complete" ? <CheckIcon /> : <AlertIcon />}</span>
          <strong>{step.label}</strong>
          <p>{step.detail}</p>
        </div>
      ))}
    </section>
  );
}

