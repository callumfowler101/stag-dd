export default function NotifOverlay({ notif, onDismiss, isPreview = false }) {
  if (!notif) return null;
  return (
    <div className="notif-overlay" onClick={onDismiss}>
      <div style={{ width: '100%', maxWidth: 480 }}>
        {isPreview && (
          <div className="notif-preview-tag">⬧ PLAYER WILL SEE THIS ⬧</div>
        )}
        <div className="notif-card" onClick={(e) => e.stopPropagation()}>
          <div className="notif-inner-border" />
          <div className="notif-top-bar" />
          <div className="notif-body-wrap">
            <div className="notif-glyph">{notif.glyph || '⚔'}</div>
            <div className="notif-title">{notif.title}</div>
            <div className="notif-hl-div" />
            <div className="notif-text">{notif.body}</div>
            <div className="notif-dismiss">— tap to dismiss —</div>
          </div>
        </div>
      </div>
    </div>
  );
}
