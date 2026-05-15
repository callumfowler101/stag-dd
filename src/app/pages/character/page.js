'use client'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import styles from './character_page.module.css'
import ClassEmblem from '../../../components/class_emblem.js'
import NotifOverlay from '../../../components/notif_overlay.js'
import { STAT_ORDER, STAT_COLORS, getLevel, getXPPct, getXPToNext } from '../../../stores/game_data.js'
import { getCharacter } from '../../../server_actions/getCharacter.js'
import { getUnreadNotifications } from '../../../server_actions/getUnreadNotifications.js'
import { setNotificationAsRead } from '../../../server_actions/setNotificationAsRead.js'

/* ── Animated XP bar ── */
function XPBar({ xp }) {
  const [pct, setPct] = useState(0);
  useEffect(() => { const t = setTimeout(() => setPct(getXPPct(xp)), 300); return () => clearTimeout(t); }, [xp]);
  const level = getLevel(xp);
  return (
    <div className={styles.heroXp}>
      <div className={styles.heroXpBg}>
        <div className={styles.heroXpFill} style={{ width: `${pct}%` }} />
      </div>
      <span className={styles.heroXpTxt}>{xp} · {getXPToNext(xp)} to Lv{level + 1}</span>
    </div>
  );
}

/* ── Animated stat bar ── */
function StatBar({ stat, value, delay = 0 }) {
  const [w, setW] = useState(0);
  useEffect(() => { const t = setTimeout(() => setW(value), 180 + delay); return () => clearTimeout(t); }, [value, delay]);
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

function CharacterContent() {
  const [data,         setData]         = useState(null);
  const [notification, setNotification] = useState(null);
  const [loading,      setLoading]      = useState(true);
  const searchParams = useSearchParams();
  const uuid = searchParams.get('uuid');

  useEffect(() => {
    if (!uuid) return;
    Promise.all([
      getCharacter(uuid),
      getUnreadNotifications(),
    ]).then(([char, notifs]) => {
      setData(char);
      if (notifs.length > 0) {
        const n = notifs[0];
        if (n.userUuid === uuid || n.userUuid === 0) setNotification(n);
      }
      setLoading(false);
    });
  }, [uuid]);

  const dismissNotif = () => {
    setNotificationAsRead(notification.uuid);
    setNotification(null);
  };

  if (loading) {
    return (
      <div className={styles.loadingWrap}>
        <span style={{ fontFamily: 'var(--rs)', color: 'var(--text-muted)', letterSpacing: 2 }}>
          Loading…
        </span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.loadingWrap}>
        <span style={{ fontFamily: 'var(--rs)', color: 'var(--text-muted)' }}>
          Hero not found.
        </span>
      </div>
    );
  }

  const fullName = `${data.name} ${data.title}`;
  const level    = getLevel(data.experience);

  return (
    <>
      {/* Nav */}
      <nav className="nav">
        <Link href="/" className="nav-logo">⬧ Stagscape</Link>
        <div className="nav-links">
          <span className="nav-link active">Character</span>
        </div>
      </nav>

      {/* Hero header */}
      <div className={`${styles.hero} fade-in`}>
        <div className={styles.heroWm}>
          <ClassEmblem id={data.classname} />
        </div>
        <div className={styles.heroBody}>
          <div className={styles.heroName}>{fullName}</div>
          <div className={styles.heroMeta}>
            <span className="gold-badge">{data.classname}</span>
            <span className={styles.heroSep}>·</span>
            <span className={styles.heroLvl}>Level {level}</span>
            <span className={styles.heroSep}>·</span>
            <span className={styles.heroUuid}>#{data.uuid}</span>
          </div>
          <XPBar xp={data.experience} />
        </div>
      </div>

      {/* Main content */}
      <div className={`${styles.pageMain} fade-in`}>
        {/* Left column */}
        <div className={styles.leftCol}>
          <div className="panel">
            <div className="panel-body" style={{ padding: 0 }}>
              <div style={{ padding: '14px 14px 10px' }}>
                <div className={styles.portraitBox}>
                  <div className={styles.portraitInnerTl} />
                  <div className={styles.portraitInnerBr} />
                  <span className={styles.portraitLbl}>character portrait</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Class</span>
                <span className={styles.infoVal}>{data.classname}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Title</span>
                <span className={styles.infoVal}>{data.title}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.infoKey}>Level</span>
                <span className={styles.infoVal}>{level}</span>
              </div>
              <div className={`${styles.infoRow} ${styles.infoRowLast}`}>
                <span className={styles.infoKey}>UUID</span>
                <span className={`${styles.infoVal} ${styles.infoValMono}`}>#{data.uuid}</span>
              </div>
            </div>
          </div>
          <div className="panel">
            <div className={styles.emblemFrame}>
              <ClassEmblem id={data.classname} />
            </div>
          </div>
        </div>

        {/* Right column — stats */}
        <div className="panel">
          <div className="panel-body">
            <div className="sec-title">Stats</div>
            <div className="sec-sub">Base attributes for {data.name}</div>
            <div className="stat-section">
              {STAT_ORDER.map((s, i) => (
                <StatBar key={s} stat={s} value={data[s]} delay={i * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer">
        STAGSCAPE · CAMPAIGN COMPANION · 2026 ·{' '}
        <Link href="/" style={{ color: 'var(--text-dim)', fontFamily: 'var(--rs)', fontSize: 10, letterSpacing: 2 }}>
          new hero
        </Link>
      </div>

      <NotifOverlay notif={notification} onDismiss={dismissNotif} />
    </>
  );
}

export default function CharacterPage() {
  return (
    <Suspense fallback={
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <span style={{ fontFamily: 'var(--rs)', color: 'var(--text-muted)', letterSpacing: 2 }}>Loading…</span>
      </div>
    }>
      <CharacterContent />
    </Suspense>
  );
}
