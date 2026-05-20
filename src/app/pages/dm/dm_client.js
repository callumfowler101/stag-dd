'use client'
import { useState, useRef } from 'react'
import Link from 'next/link'
import styles from './styles.module.css'
import ClassEmblem from '../../../components/class_emblem.js'
import NotifOverlay from '../../../components/notif_overlay.js'
import { STAT_ORDER, STAT_COLORS, getLevel } from '../../../stores/game_data.js'
import { updateStatOnCharacter } from '../../../server_actions/updateStatOnCharacter.js'
import { sendNotification } from '../../../server_actions/sendNotification.js'
import { useEffect } from 'react'

/* ── Stat bar ── */
function StatBar({ stat, value, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 120 + delay); return () => clearTimeout(t); }, [value, delay]);
  return (
    <div className={`stat-row${stat === 'experience' ? ' xp' : ''}`}>
      <span className="stat-lbl">{stat}</span>
      <div className="stat-bg">
        <div className="stat-fill" style={{ width: `${w}%`, background: STAT_COLORS[stat] }} />
      </div>
      <span className="stat-val">{value}</span>
    </div>
  );
}

/* ── Player row ── */
function PlayerRow({ player, onGiveXP }) {
  const [xpAmt,    setXpAmt]    = useState('');
  const [expanded, setExpanded] = useState(false);
  const [flash,    setFlash]    = useState(false);
  const fullName = `${player.name} ${player.title}`;
  const level    = getLevel(player.experience);

  const handleGiveXP = () => {
    const amt = parseInt(xpAmt, 10);
    if (!amt || amt <= 0) return;
    onGiveXP(player.uuid, amt, fullName);
    setXpAmt('');
    setFlash(true);
    setTimeout(() => setFlash(false), 600);
  };

  return (
    <div className={`${styles.playerRow}${flash ? ' ' + styles.xpFlash : ''}`}>
      <div className={styles.playerRowMain}>
        <div className={styles.playerEmblem}>
          <ClassEmblem id={player.classname} />
        </div>
        <div className={styles.playerInfo}>
          <div className={styles.playerName}>{fullName}</div>
          <div className={styles.playerMeta}>{player.classname} · Lv {level}</div>
        </div>
        <span className={styles.playerXpBadge}>{player.experience} XP</span>
        <div className={styles.xpControls}>
          <input
            className={`rs-input ${styles.xpInput}`}
            type="number"
            min="1"
            placeholder="+XP"
            value={xpAmt}
            onChange={(e) => setXpAmt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGiveXP()}
          />
          <button
            className="rs-btn rs-btn-primary"
            style={{ fontSize: 11, padding: '6px 12px' }}
            disabled={!xpAmt || parseInt(xpAmt) <= 0}
            onClick={handleGiveXP}
          >
            Give XP
          </button>
        </div>
        <button
          className={`${styles.expandBtn}${expanded ? ' ' + styles.expandBtnOpen : ''}`}
          onClick={() => setExpanded((e) => !e)}
          title="View stats"
        >
          {expanded ? '▲' : '▼'}
        </button>
      </div>
      {expanded && (
        <div className={styles.playerStats}>
          <div className="stat-section">
            {STAT_ORDER.map((s, i) => (
              <StatBar key={s} stat={s} value={player[s]} delay={i * 70} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Event log ── */
function EventLog({ events }) {
  return (
    <div className={styles.eventLog}>
      {[...events].reverse().map((ev) => (
        <div
          key={ev.uuid}
          className={`${styles.eventItem} ${styles['eventType_' + ev.type]}${ev.isNew ? ' ' + styles.newEvent : ''}`}
        >
          <span className={styles.eventTime}>{ev.time}</span>
          <div>
            <div className={styles.eventTitle}>{ev.title}</div>
            <div className={styles.eventBody}>{ev.body}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Notification broadcast form ── */
function NotifForm({ players, onSend }) {
  const [title,  setTitle]  = useState('');
  const [body,   setBody]   = useState('');
  const [target, setTarget] = useState('all');

  const send = () => {
    if (!title.trim() || !body.trim()) return;
    onSend({ title: title.trim(), body: body.trim(), target });
    setTitle('');
    setBody('');
  };

  const targetName = target === 'all'
    ? 'All'
    : players.find((p) => p.uuid === target)?.name ?? 'Player';

  return (
    <div className={styles.notifForm}>
      <div className="sec-title">Broadcast</div>
      <div className="sec-sub">Send a message to the party</div>
      <input
        className="rs-input"
        placeholder="Notification title…"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ width: '100%' }}
      />
      <textarea
        className="rs-textarea"
        placeholder="Message to players…"
        rows={3}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{ width: '100%' }}
      />
      <div className={styles.targetRow}>
        <button
          className={`${styles.targetBtn}${target === 'all' ? ' ' + styles.targetBtnSel : ''}`}
          onClick={() => setTarget('all')}
        >
          All Players
        </button>
        {players.map((p) => (
          <button
            key={p.uuid}
            className={`${styles.targetBtn}${target === p.uuid ? ' ' + styles.targetBtnSel : ''}`}
            onClick={() => setTarget(p.uuid)}
          >
            {p.name}
          </button>
        ))}
      </div>
      <button
        className="rs-btn rs-btn-primary"
        style={{ width: '100%', fontSize: 12 }}
        disabled={!title.trim() || !body.trim()}
        onClick={send}
      >
        ⬧ Broadcast to {targetName}
      </button>
    </div>
  );
}

/* ── Helpers ── */
function nowTime() {
  const d = new Date();
  const h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, '0');
  return `${h}:${m}${h < 12 ? 'am' : 'pm'}`;
}

const INITIAL_EVENTS = [
  { uuid: 'e0', type: 'system', time: '', title: 'Session started', body: 'The party gathers. Let the adventure begin.' },
];

/* ── Main DM client ── */
export default function DmClient({ initialPlayers }) {
  const [players,   setPlayers]   = useState(initialPlayers);
  const [events,    setEvents]    = useState(INITIAL_EVENTS);
  const [notif,     setNotif]     = useState(null);
  const [isPreview, setIsPreview] = useState(false);
  const evtIdRef = useRef(10);

  const addEvent = (ev) => {
    const id = `e${evtIdRef.current++}`;
    setEvents((prev) => [...prev, { ...ev, uuid: id, time: nowTime(), isNew: true }]);
  };

  const handleGiveXP = (uuid, amount, name) => {
    const newXP = (players.find((p) => p.uuid === uuid)?.experience ?? 0) + amount;
    setPlayers((prev) =>
      prev.map((p) => p.uuid === uuid ? { ...p, experience: p.experience + amount } : p)
    );
    addEvent({ type: 'xp', title: 'XP Gained', body: `${name} earned ${amount} XP.` });
    updateStatOnCharacter(uuid, { experience: newXP });
  };

  const handleBroadcast = ({ title, body, target }) => {
    const targetLabel = target === 'all'
      ? 'All players'
      : `${players.find((p) => p.uuid === target)?.name ?? 'Player'} (only)`;
    addEvent({ type: 'notif', title: `Broadcast: ${title}`, body: `→ ${targetLabel}` });
    const notifUuid = `notification_${Math.floor(Math.random() * 1000000) + 1000000}`;
    sendNotification({
      title,
      body,
      type: 'event',
      read: false,
      uuid: notifUuid,
      userUuid: target === 'all' ? 0 : target,
    }, notifUuid);
    setIsPreview(true);
    setNotif({ title, body });
  };

  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <Link href="/" className="nav-logo">⬧ Stagscape</Link>
        <div className="nav-links">
          <Link href="/" className="nav-link">New Hero</Link>
          <Link href="/pages/character" className="nav-link">Character</Link>
          <span className="nav-link active">Dungeon Master</span>
        </div>
      </nav>

      {/* DM header */}
      <div className={`${styles.dmHeader} fade-in`}>
        <div>
          <div className={styles.dmTitle}>Dungeon Master</div>
          <div className={styles.dmSub}>STAGSCAPE · SESSION CONTROL</div>
        </div>
        <div className={styles.sessionBadge}>
          <div className={styles.sessionDot} />
          <span className={styles.sessionLbl}>Session Live</span>
        </div>
      </div>

      {/* Main two-column layout */}
      <div className={`${styles.dmMain} fade-in`}>
        {/* Players column */}
        <div className={styles.playersCol}>
          <div className={styles.playersHead}>
            <div className="sec-title">Players</div>
            <span className={styles.playerCount}>{players.length} in session</span>
          </div>
          <div className={styles.playerList}>
            {players.map((p) => (
              <PlayerRow key={p.uuid} player={p} onGiveXP={handleGiveXP} />
            ))}
          </div>
        </div>

        {/* Events + broadcast column */}
        <div className={styles.eventsCol}>
          <div className={styles.eventsHead}>
            <div className="sec-title">Event Log</div>
          </div>
          <EventLog events={events} />
          <NotifForm players={players} onSend={handleBroadcast} />
        </div>
      </div>

      <div className="footer">STAGSCAPE · CAMPAIGN COMPANION · 2026</div>

      <NotifOverlay notif={notif} onDismiss={() => setNotif(null)} isPreview={isPreview} />
    </>
  );
}
