from __future__ import annotations

import json
from pathlib import Path

from app.models import EvidenceItem, Opportunity


PROJECT_ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = PROJECT_ROOT / "data" / "demo.json"


def load_demo_data() -> tuple[list[Opportunity], list[EvidenceItem]]:
    payload = json.loads(DATA_PATH.read_text(encoding="utf-8"))
    opportunities = [Opportunity.model_validate(item) for item in payload["opportunities"]]
    evidence = [EvidenceItem.model_validate(item) for item in payload["evidence"]]
    return opportunities, evidence

