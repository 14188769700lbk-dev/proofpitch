# Demo video workflow

The submission video is prepared locally and is not uploaded by this repository.
The checked-in recorder produces a 1536×864, 25 fps WebM with burned-in English
chapter cards and captions. It exercises the real local UI and API: evidence
matching, a local human-review record, and the hard-risk fixture that withholds
the draft and blocks approval.

## Re-record the interface

Build and start ProofPitch first:

```powershell
cd frontend
npm ci
npm run build
cd ..
.venv\Scripts\python -m uvicorn app.main:app --host 127.0.0.1 --port 8080
```

In a second terminal, install the optional capture dependency and record:

```powershell
cd scripts
npm ci
npx playwright install chromium
npm run record
```

The default output is outside the repository at
`../output/proofpitch-demo/proofpitch-demo-silent.webm`. Set
`PLAYWRIGHT_EXECUTABLE_PATH` to a locally installed Chromium-family browser to
avoid downloading a separate browser. Set `PROOFPITCH_URL` to change the local
application URL.

## Narration and publication boundary

`docs/demo-narration.txt` is the exact English narration source. The current
local review copy combines that narration with the captured interface and runs
for about two minutes and forty-nine seconds. The narration accurately states
that optional Bedrock execution has not occurred, all listings are synthetic,
and a local review record sends nothing externally.

Do not commit raw call credentials, private application data, rendered videos,
or upload tokens. Publishing a YouTube/Vimeo video and making the final Devpost
submission are separate external actions.
