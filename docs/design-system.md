# ProofPitch design system

The accepted concept is [`design-concept.png`](design-concept.png). It is the
implementation reference for the primary desktop workspace.

## Visual direction

- Background: true white, not cream or tinted gray.
- Primary ink: deep navy; secondary copy: slate.
- Accent: restrained acid lime for verified states and primary actions.
- Gap color: amber; blocking color: muted red.
- Geometry: open rails and tables, thin borders, small radii, nearly no shadow.
- Typography: bold grotesk-like headings and compact neutral UI text.
- Signature motif: an evidence spine connecting the four workflow stages.

## Component inventory

- Quiet header with brand, three navigation items, and one primary action.
- Opportunity rail with compact rows and an obvious selected state.
- Verdict summary and evidence matrix.
- Risk review rail with three explicit checks.
- Editable application draft with one local approval action.
- Horizontal evidence timeline.

## Interaction and safety rules

- Selecting an opportunity reruns the local assessment.
- The draft is editable before approval.
- `Request human approval` records a local review event only.
- There is no outbound message or application endpoint.
- Payment, crypto, suspicious-check, and off-platform-only signals block review.

## Responsive plan

Below 980 px the left opportunity rail becomes a full-width selector, the main
workspace follows, and risk review moves below the evidence matrix. Below 680 px
the matrix becomes labeled stacked rows and the timeline becomes vertical.

