import { EvidenceIcon, PlayIcon, QueueIcon, ReviewIcon } from "./Icons";

type Props = {
  busy: boolean;
  onRun: () => void;
};

export function Header({ busy, onRun }: Props) {
  return (
    <header className="topbar">
      <a className="brand" href="#queue" aria-label="ProofPitch home">ProofPitch</a>
      <nav className="topnav" aria-label="Primary navigation">
        <a className="nav-link active" href="#queue"><QueueIcon />Queue</a>
        <a className="nav-link" href="#evidence"><EvidenceIcon />Evidence</a>
        <a className="nav-link" href="#review"><ReviewIcon />Review</a>
      </nav>
      <button className="primary-action" type="button" onClick={onRun} disabled={busy}>
        <PlayIcon />{busy ? "Assessing…" : "Run assessment"}
      </button>
    </header>
  );
}

