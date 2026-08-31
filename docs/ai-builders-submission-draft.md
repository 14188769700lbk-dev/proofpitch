# AI Builders Hackathon 2026 submission draft

Last prepared: 2026-08-31 (Asia/Shanghai)

This is a local draft. It is not evidence of event eligibility, registration,
or submission. The Devpost overview currently labels the event student-only,
while the published rules and an organizer response say non-students may enter.
That inconsistency should be resolved before final submission.

## Project

**Name:** ProofPitch

**Tagline:** Evidence before applications.

**Primary prize fit:** Best SaaS Product

## One-line description

ProofPitch is an evidence-grounded AI agent that reviews job and freelance
opportunities, exposes unsupported claims, blocks hard scam signals, and
prepares a truthful draft that remains under human control.

## What it does

ProofPitch converts a listing into one reviewable decision. It parses explicit
requirements, matches each claim only to operator-supplied public evidence,
keeps unsupported skills visible as disclosure gaps, checks for payment and
off-platform scam signals, and prepares a draft only when the risk gate allows
it. An upfront fee, crypto transfer, suspicious equipment check, or
off-platform-only contact withholds the draft and blocks approval.

The current product is a reproducible local prototype with synthetic fixtures.
It has no external sending route, no customers, no revenue, no production
deployment, and no verified hiring outcomes.

## Why it is a SaaS candidate

The reusable product loop is listing intake, evidence mapping, risk review,
grounded drafting, and a human approval record. The first target user is an
independent developer whose public work is stronger evidence than a long
employment history. Subscription, seat-based career-support workspaces, and a
platform API are business-model hypotheses to validate; none is presented as
current traction.

## Technical implementation

The FastAPI backend registers four Strands Agents SDK tools:

1. `parse_opportunity`
2. `match_public_evidence`
3. `check_risk_signals`
4. `prepare_application_draft`

The credential-free demo invokes the tools through the Strands registry in a
deterministic replay. The React and TypeScript frontend shows the requirement
matrix, evidence decisions, disclosure gaps, risk state, draft, and approval
boundary. The repository includes tests, a production frontend build, Docker
packaging, and public CI. An optional Amazon Bedrock path exists in code but was
not invoked and is not claimed as a deployment.

## Links

- Public repository: https://github.com/14188769700lbk-dev/proofpitch
- Public video: https://youtu.be/Z6wc1sby9Vo
- Architecture: https://github.com/14188769700lbk-dev/proofpitch/blob/main/docs/architecture.png

## Development disclosure

ProofPitch was primarily generated and iterated by OpenAI Codex under the solo
entrant's authorization. The entrant owns and submits the repository and is
responsible for its claims and event compliance. The project does not claim
hand-authored implementation, prior client delivery, production use, customers,
revenue, or optional AWS execution that did not occur.

## Deck map

The local ten-slide deck at `artifacts/ProofPitch-AI-Builders-Deck.pptx` covers:

1. product promise;
2. the volume-versus-trust problem;
3. the reviewable decision loop;
4. evidence-grounded drafting;
5. the hard-risk gate;
6. the architecture;
7. human-control boundaries;
8. reproducible readiness;
9. target users and business-model hypotheses;
10. present evidence, development disclosure, and next validation steps.

## Remaining external gates

- Confirm entrant eligibility despite the student-only UI inconsistency.
- Join the event using the currently signed-in Devpost account.
- Create and save the ProofPitch project draft.
- Upload the deck if Devpost exposes the required presentation field.
- Re-check the public repository, public video, and all disclosures.
- Obtain a separate action-time confirmation before final submission.
