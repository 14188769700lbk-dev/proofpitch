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

## Video storyboard (measured final copy: 2:49.04)

1. **0:00–0:12 — Title:** Evidence before applications; human judgment before
   action.
2. **0:12–0:30 — Problem and audience:** Introduce the repetitive, risky review
   work faced by independent developers.
3. **0:30–0:54 — Architecture:** Explain the four Strands tools and the explicit
   risk-to-draft dependency.
4. **0:54–1:33 — Caveated listing:** Use the synthetic model-card role to show
   verified evidence, the MLflow disclosure gap, and why willingness to learn is
   not converted into experience.
5. **1:33–1:53 — Human gate:** Show the grounded draft and record local review;
   state that no external application was sent.
6. **1:53–2:25 — Blocked listing:** Show Telegram-only contact and a crypto fee
   triggering the hard-risk gate, draft withholding, disabled approval, and
   blocked timeline stages.
7. **2:25–2:49 — Boundary and proof:** Reiterate no automatic sending, no invented
   experience, no claim of optional Bedrock execution, and summarize the tested
   implementation.

The video may use screen recording and voiceover; no on-camera appearance is
required.

## Submission readiness

The public repository, license, README, architecture diagram, local video, and
submission copy are ready. The remaining mandatory gates are a **public**
YouTube/Vimeo upload, an AWS Builder ID, the AWS-account step listed in the
official How To Enter section, creation of the Devpost project, and a separately
authorized final submission. See `docs/submission-evidence-audit.md` for the
evidence matrix and optional-versus-required distinction.
