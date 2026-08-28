# Agents for Humans submission evidence audit

Last checked: 2026-08-28 (Asia/Shanghai)

Official sources:

- Event overview: https://agentsforhumans.devpost.com/
- Official rules: https://agentsforhumans.devpost.com/rules
- AWS Builder ID and AWS-account distinction:
  https://docs.aws.amazon.com/signin/latest/userguide/differences-builder-id.html
- AWS Builder ID sign-in and pricing statement:
  https://docs.aws.amazon.com/signin/latest/userguide/sign-in-builder-id.html
- AWS account sign-up and payment requirements:
  https://docs.aws.amazon.com/accounts/latest/reference/getting-started.html
- Public repository: https://github.com/14188769700lbk-dev/proofpitch
- Passing CI at the current public commit:
  https://github.com/14188769700lbk-dev/proofpitch/actions/runs/32939361085

This document separates verified evidence from remaining submission gates. It is
not proof of entrant eligibility, AWS account ownership, or a Devpost submission.

## Current verdict

**Conditionally ready for the Professional Agents track.** The project and its
non-account submission materials are ready, but a compliant entry cannot yet be
claimed. The official submission checklist requires a public YouTube/Vimeo video
and an AWS Builder ID. The official How To Enter section also says to sign up for
an AWS Account. None of those account/publication gates is verified here.

The event page shows the signed-in Devpost account as registered for the
hackathon. No ProofPitch Devpost project or final submission has been created.

## Requirement-to-evidence matrix

| Official requirement | Evidence | Status |
| --- | --- | --- |
| Register for the hackathon | The signed-in event page displayed `You're registered for this hackathon` on 2026-08-28. | Verified |
| Submit by September 14, 2026 at 5:00 PM PT | Devpost renders the local deadline as September 15, 2026 at 8:00 AM GMT+8. | Open deadline |
| Build a new project during the submission period | `BUILD_ORIGIN.json` records creation on 2026-08-26 and no incorporated pre-existing code. Git history begins on 2026-08-26, after the August 10 opening. Public portfolio URLs are data inputs, not copied code. | Verified from repository evidence |
| Use Strands Agents SDK for a working, non-trivial agent | `app/agent.py` registers four Strands tools; tests exercise the tool registry and gated workflow. The default replay is credential-free. | Verified |
| Handle real work for real people, end to end | The workflow parses an opportunity, maps public evidence, checks hard-risk signals, prepares or withholds a grounded draft, and records local human review. External sending is intentionally outside the product boundary. | Verified with disclosed boundary |
| Professional Agents track fit | The official description targets repetitive, judgment-heavy work for professionals and small-business owners. ProofPitch targets evidence review and application safety for independent developers. | Strong fit |
| Function consistently as described | Local verification passes; public CI run `32939361085` succeeded at commit `9ec9e72` and includes backend tests, frontend production build, and Docker image build. | Verified at public commit `9ec9e72` |
| Public source repository | `https://github.com/14188769700lbk-dev/proofpitch` is public. | Verified |
| MIT or Apache license visible in repository About area | GitHub detects `Apache-2.0 license`; `LICENSE` is present. | Verified |
| README and complete setup instructions | `README.md`, dependency locks, `Dockerfile`, synthetic fixtures, and local run commands are present. | Verified |
| Architecture diagram | `docs/architecture.png` and its editable SVG source are present and referenced from the README. | Verified |
| Text description of features and functionality | `docs/devpost-submission-draft.md` contains evidence-grounded submission copy. | Ready locally |
| Demo video, maximum five minutes | Local `proofpitch-demo.mp4` is 169.04 seconds, 1536×864, H.264/AAC, with English narration and burned-in captions. The contact sheet was visually reviewed. | Verified locally |
| Video demonstrates the working project | It shows the real local UI/API path for evidence matching, disclosure gaps, local review, hard-risk detection, draft withholding, and blocked approval. | Verified locally |
| Video pitch covers the problem, audience, and why it matters | The narration identifies independent developers, risky/high-volume applications, and the value of evidence and human judgment. | Verified locally |
| Upload video to YouTube or Vimeo and make it public | The video has not been uploaded. An unlisted video would not satisfy the explicit public-video wording. | **Mandatory blocker** |
| AWS Builder ID | No Builder ID is verified. | **Mandatory blocker** |
| Sign up for an AWS Account | The official How To Enter section lists this step. No AWS account is verified and no account creation is authorized by this repository. | **Unresolved entry gate** |
| Give judges free testing access | The public repository provides a credential-free runnable test build and exact setup instructions. There is no hosted live demo. | Ready as test build; hosted access absent |
| Live demo link | The overview and rules label this optional and say it strengthens Technical Implementation. | Optional, absent |
| Amazon Bedrock AgentCore deployment | The rules explicitly say this strengthens Technical Implementation but is not required. The optional Bedrock code path has not been invoked and no AgentCore deployment is claimed. | Optional, absent |
| builder.aws build-story post | Optional bonus of up to 0.6 points under the rules. No post exists. | Optional, absent |
| Final Devpost project and submission | No ProofPitch project or final submission has been created. | **Mandatory blocker** |

## AWS identity and payment boundary

AWS documentation says that an AWS Builder ID is a free personal profile and is
separate from an AWS Account. It cannot, by itself, provide normal AWS Console,
CLI, SDK, or billable-resource credentials. This makes the Builder ID a bounded
identity step that can be considered independently.

An AWS Account is different: AWS describes it as a resource container with
contact and payment information. The advanced sign-up documentation says a valid
payment method is required and that phone verification may occur. The newer
sign-up flow says it may request payment information and may place a temporary
USD 1 verification hold. Therefore, **do not treat the event's AWS Account step
as card-free or cost-free merely because the hackathon itself has no entry fee**.

Within a no-card/no-payment boundary, creating only the free Builder ID is
potentially acceptable after action-time approval. The separate AWS Account
requirement should be clarified with the organizer or explicitly accepted by the
owner before any account flow is started.

## Video evidence

Local review artifact, deliberately outside the repository:

`../output/proofpitch-demo/proofpitch-demo.mp4`

Measured properties:

- Duration: 169.04 seconds (2:49.04)
- Video: H.264, 1536×864, 25 fps
- Audio: AAC, mono, 22.05 kHz
- Size: 8,939,794 bytes

The scripted chapters total 168 seconds; capture and transition overhead account
for the measured 169.04-second file. The narration truthfully discloses that the
fixtures are synthetic, no external application is sent, and optional Bedrock
execution did not occur.

## Judging-position audit

The five official Stage Two criteria are equally weighted.

1. **Technical Implementation — strong without cloud bonus.** Four registered
   Strands tools, explicit data dependencies, hard failure boundaries, ten tests,
   a production frontend build, Docker packaging, and public CI demonstrate a
   working implementation. A live demo or AgentCore deployment would improve the
   score but is not required.
2. **Design — strong.** The interface is a coherent review workspace with visible
   evidence, risk, draft, approval, and timeline states rather than a raw API demo.
3. **Potential Impact — credible but unvalidated.** The use case is specific and
   the product addresses it directly, but there are no customers, user-study
   results, hiring outcomes, or revenue. Do not imply any.
4. **Creativity & Originality — strong.** Evidence-gated drafting and a hard
   anti-scam boundary are a non-obvious alternative to volume-first application
   bots.
5. **Presentation — ready locally.** The video shows the flow end to end and stays
   below five minutes, but it cannot count until published publicly.

## Safe next actions

1. Create the free AWS Builder ID after action-time approval. Do not continue
   into AWS Account creation or any upgrade/subscription path.
2. Ask the organizer whether a separate AWS Account is an eligibility gate when
   the project uses the credential-free Strands SDK path and does not deploy to
   AWS. Do not infer the answer from the optional AgentCore wording.
3. Upload the reviewed MP4 to YouTube or Vimeo as **Public**, then verify playback,
   duration, audio, captions, and URL without changing its claims.
4. Create the Devpost project, enter the prepared text, repository URL, public
   video URL, architecture evidence, Professional Agents track, and Builder ID.
5. Re-run the final checklist against the public commit and public video before
   the separate final-submission action.

Do not request promotional credits, enable paid AWS services, deploy to AgentCore,
publish a builder.aws post, or make the final Devpost submission merely because
those options appear in the event interface. Each is a separate external action.
