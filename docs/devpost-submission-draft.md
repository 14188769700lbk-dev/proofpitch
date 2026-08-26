# Devpost submission draft

## Project

**Name:** ProofPitch  
**Tagline:** Evidence before applications.  
**Track:** Professional Agents

## What it does

ProofPitch turns a job or freelance listing into one reviewable decision. It
extracts requirements, matches each claim only to supplied public portfolio
evidence, keeps unsupported skills visible as disclosure gaps, checks for
payment and off-platform scam signals, and prepares a truthful application
draft only when the risk gate allows it.

When a listing asks for an upfront fee, crypto transfer, suspicious equipment
check, or off-platform-only contact, ProofPitch returns **Do not apply**,
withholds the application draft, blocks human approval, and identifies the
specific signals that stopped the workflow. No route can send an application.

## The problem

High-volume application tools reward speed and generic claims. Applicants can
waste time on poor-fit or unsafe listings, accidentally exaggerate experience,
or move past payment and contact red flags. Junior independent developers are
especially exposed because their strongest proof is often public code rather
than a long employment history.

## How it works

ProofPitch registers four real Strands Agents SDK tools:

1. `parse_opportunity` validates and structures the listing.
2. `match_public_evidence` maps requirements only to supplied, public artifacts.
3. `check_risk_signals` identifies payment, crypto, suspicious-check, and
   off-platform-only patterns.
4. `prepare_application_draft` receives both the evidence decisions and the
   completed risk review. It drafts grounded text for safe listings and returns
   a safety notice for blocked listings.

The public demo invokes these tools through the Strands tool registry in a
deterministic, credential-free replay. An optional `run_live` path uses the same
tool set through a Strands model loop with Amazon Bedrock when the operator has
lawful AWS access. The default demo does not claim that Bedrock was invoked.

## What makes it useful

- Every skill claim is traceable to a named public artifact.
- Missing experience stays visible instead of being invented.
- Hard risk signals stop both drafting and approval.
- A local human-review record is clearly distinguished from an external send.
- Four synthetic fixtures reproduce ready, caveated, and blocked decisions
  without exposing personal or employer data.

## Built with

Strands Agents SDK, Python, FastAPI, Pydantic, React, TypeScript, Vite, Docker,
Pytest, and an optional Amazon Bedrock model path.

## Reproduce it

Install the Python and frontend dependencies, build the frontend, start the
FastAPI service, and open the local workspace. The README contains exact
commands. The default path requires no cloud credentials and no paid inference.

## Submission disclosure

ProofPitch was created from scratch during the hackathon submission period.
Public LineageMedic and ChangeFleet links are evidence inputs only; their code
was not incorporated. The project has no customers, revenue, live employer
integration, AWS deployment, or automatic sending feature as of this draft.

## Video storyboard (about 3 minutes 30 seconds)

1. **0:00–0:25 — Problem:** Show how a listing can mix genuine requirements,
   missing skills, and scam signals.
2. **0:25–0:55 — Architecture:** Explain the four Strands tools and the explicit
   risk-to-draft dependency.
3. **0:55–1:45 — Caveated listing:** Select the model-card fixture. Show verified
   evidence, the MLflow disclosure gap, and the grounded draft.
4. **1:45–2:15 — Human gate:** Record local human review and show the exact
   message that no external application was sent.
5. **2:15–3:00 — Blocked listing:** Select the synthetic scam fixture. Show
   payment and off-platform detections, the withheld draft, blocked approval,
   and blocked timeline states.
6. **3:00–3:30 — Impact:** Summarize truthful applications, safer opportunity
   screening, reproducible local execution, and the disabled outbound boundary.

The video may use screen recording and voiceover; no on-camera appearance is
required.
