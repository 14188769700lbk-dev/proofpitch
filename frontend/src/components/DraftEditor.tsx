import { LinkIcon, ListIcon, LockIcon } from "./Icons";

type Props = {
  draft: string;
  disabled: boolean;
  approvalMessage: string;
  onDraftChange: (value: string) => void;
  onApprove: () => void;
};

export function DraftEditor({ draft, disabled, approvalMessage, onDraftChange, onApprove }: Props) {
  const words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
  return (
    <section className="draft-section" id="review" aria-labelledby="draft-heading">
      <div className="section-heading-row">
        <h2 id="draft-heading">Application draft</h2>
        <span>{words} words</span>
      </div>
      <div className="draft-layout">
        <div className="editor-frame">
          <div className="editor-toolbar" aria-hidden="true"><b>B</b><i>I</i><ListIcon /><LinkIcon /></div>
          <textarea value={draft} onChange={(event) => onDraftChange(event.target.value)} aria-label="Application draft" />
        </div>
        <div className="approval-panel">
          <div className="approval-copy"><span className="approval-lock"><LockIcon /></span><div><strong>Nothing is sent without approval.</strong><p>Your draft and evidence stay local until a human reviews them.</p></div></div>
          <button className="approval-button" type="button" onClick={onApprove} disabled={disabled}>
            <LockIcon />{disabled ? "Approval blocked" : "Request human approval"}
          </button>
          {approvalMessage && <p className="approval-message" role="status">{approvalMessage}</p>}
        </div>
      </div>
    </section>
  );
}
