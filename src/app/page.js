'use client'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import styles from './page.module.css'
import ClassEmblem from '../components/class_emblem.js'
import Embers from '../components/embers.js'
import {
  CLASSES,
  TITLES,
  STAT_ORDER,
  STAT_COLORS,
} from '../stores/game_data.js'
import { submitCharacter } from '../server_actions/submitCharacter.js'
import { peekPortrait } from '../server_actions/peekPortrait.js'

// import { initDB } from '../scripts/database.js'

/* ── Helpers ── */
function genUuid() {
  return String(Math.floor(Math.random() * 1000000) + 1000000)
}

/* ── Step indicator ── */
function StepIndicator({ step }) {
  const labels = ['Choose Class', 'Name Hero', 'Confirm']
  return (
    <div className={styles.steps}>
      {labels.map((lbl, i) => {
        const n = i + 1
        const active = n === step
        const done = n < step
        return (
          <span key={i} style={{ display: 'flex', alignItems: 'center' }}>
            <span className={styles.stepNode}>
              <span
                className={`${styles.stepDot}${
                  active
                    ? ' ' + styles.stepDotActive
                    : done
                    ? ' ' + styles.stepDotDone
                    : ''
                }`}
              >
                {done ? '✓' : ['I', 'II', 'III'][i]}
              </span>
              <span
                className={`${styles.stepLbl}${
                  active ? ' ' + styles.stepLblActive : ''
                }`}
              >
                {lbl}
              </span>
            </span>
            {i < 2 && <span className={styles.stepConn} />}
          </span>
        )
      })}
    </div>
  )
}

/* ── Mini stat bar ── */
function MiniStat({ stat, value }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(value), 120)
    return () => clearTimeout(t)
  }, [value])
  return (
    <div className={styles.mstat}>
      <span className={styles.mstatLbl}>{stat}</span>
      <div className={styles.mstatBg}>
        <div
          className={styles.mstatFill}
          style={{ width: `${w}%`, background: STAT_COLORS[stat] }}
        />
      </div>
      <span className={styles.mstatVal}>{value}</span>
    </div>
  )
}

/* ── Class card ── */
function ClassCard({ cls, selected, onSelect }) {
  return (
    <div
      className={`${styles.clsCard}${selected ? ' ' + styles.clsCardSel : ''}`}
      onClick={() => onSelect(cls)}
    >
      <div className={styles.clsArt}>
        <ClassEmblem id={cls.id} />
        {selected && <div className={styles.clsSelMark}>✓</div>}
      </div>
      <div className={styles.clsBody}>
        <div className={styles.clsName}>{cls.name}</div>
        <div className={styles.clsTag}>{cls.tagline}</div>
        <div className={styles.miniStats}>
          {cls.top.map((s) => (
            <MiniStat key={s} stat={s} value={cls.stats[s]} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Full stat bar ── */
function StatBar({ stat, value, delay = 0 }) {
  const [w, setW] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => setW(value), 220 + delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return (
    <div className={`stat-row${stat === 'experience' ? ' xp' : ''}`}>
      <span className="stat-lbl">{stat}</span>
      <div className="stat-bg">
        <div
          className="stat-fill"
          style={{ width: `${w}%`, background: STAT_COLORS[stat] }}
        />
      </div>
      <span className="stat-val">{value}</span>
    </div>
  )
}

/* ── Step 1: Choose class ── */
function Step1({ selected, onSelect, onNext }) {
  return (
    <div className={`panel fade-in ${styles.wizardPanel}`}>
      <div className="panel-body">
        <div className="sec-title">Choose Your Path</div>
        <div className="sec-sub">
          Every hero begins with a choice. Who will you be?
        </div>
        <div className={styles.classGrid}>
          {CLASSES.map((cls) => (
            <ClassCard
              key={cls.id}
              cls={cls}
              selected={selected?.id === cls.id}
              onSelect={onSelect}
            />
          ))}
        </div>
        <div className="btn-row">
          <button
            className="rs-btn rs-btn-primary"
            disabled={!selected}
            onClick={onNext}
          >
            Continue →
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Step 2: Name hero ── */
function Step2({ selectedClass, onBack, onNext }) {
  const [name, setName] = useState('')
  const [title, setTitle] = useState(TITLES[0])
  const full = name.trim() ? `${name.trim()} ${title}` : ''
  const submit = () => {
    if (name.trim()) onNext({ name: name.trim(), title, fullName: full })
  }
  return (
    <div className={`panel fade-in ${styles.wizardPanel}`}>
      <div className="panel-body">
        <div className="sec-title">Name Your Hero</div>
        <div className="sec-sub">A legend is nothing without a name.</div>
        <div className={styles.nameForm}>
          <div>
            <span className={styles.clsBadge}>⬧ {selectedClass.name}</span>
          </div>
          <div>
            <div className={styles.fldLbl}>Hero Name</div>
            <div className={styles.fldRow}>
              <input
                className={`rs-input ${styles.nameInput}`}
                type="text"
                placeholder="Enter your name…"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                maxLength={24}
                autoFocus
              />
              <select
                className="rs-select"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              >
                {TITLES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <div className={styles.fldLbl}>Your Legend</div>
            <div className={styles.namePreview}>
              {full ? (
                full
              ) : (
                <span className={styles.namePreviewPh}>
                  Your name will appear here…
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="btn-row">
          <button className="rs-btn rs-btn-ghost" onClick={onBack}>
            ← Back
          </button>
          <button
            className="rs-btn rs-btn-primary"
            disabled={!name.trim()}
            onClick={submit}
          >
            Forge Your Legend →
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Step 3: Confirm ── */
function Step3({ character, selectedClass, portrait, onBack, onConfirm }) {
  return (
    <div className={`panel fade-in ${styles.wizardPanel}`}>
      <div className="panel-body">
        <div className="sec-title">Your Legend Begins</div>
        <div className="sec-sub">
          Commit your soul to the dungeon, {character.name}.
        </div>
        <div className={styles.previewWrap}>
          <div className={styles.portraitCol}>
            <div className={styles.portraitBox}>
              <div className={styles.portraitInnerTl} />
              <div className={styles.portraitInnerBr} />
              {portrait ? (
                <img
                  src={`/portraits/${portrait}.png`}
                  alt="Character portrait"
                  className={styles.portraitImg}
                />
              ) : (
                <span className={styles.portraitLbl}>character portrait</span>
              )}
            </div>
            <div className={styles.previewName}>{character.fullName}</div>
            <div className={styles.previewCls}>{selectedClass.name}</div>
          </div>
          <div className="stat-section">
            {STAT_ORDER.map((s, i) => (
              <StatBar
                key={s}
                stat={s}
                value={selectedClass.stats[s]}
                delay={i * 110}
              />
            ))}
          </div>
        </div>
        <div className="btn-row">
          <button className="rs-btn rs-btn-ghost" onClick={onBack}>
            ← Back
          </button>
          <button className="rs-btn rs-btn-primary" onClick={onConfirm}>
            Enter the Dungeon ⚔
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Success screen ── */
function SuccessScreen({ character, selectedClass, uuid, portrait }) {
  const router = useRouter()
  return (
    <div className={`panel fade-in ${styles.wizardPanel}`}>
      <div className={`panel-body ${styles.successBody}`}>
        {portrait ? (
          <div className={styles.successPortraitBox}>
            <div className={styles.portraitInnerTl} />
            <div className={styles.portraitInnerBr} />
            <img
              src={`/portraits/${portrait}.png`}
              alt={`${character.name} portrait`}
              className={styles.successPortraitImg}
            />
          </div>
        ) : (
          <div className={styles.successGlyph}>⚔</div>
        )}
        <div className="sec-title" style={{ textAlign: 'center' }}>
          The Adventure Begins
        </div>
        <p
          style={{
            color: 'var(--text-muted)',
            fontSize: 14,
            marginTop: 8,
            fontStyle: 'italic',
          }}
        >
          {character.fullName}, {selectedClass.name} of legend, has joined the
          party.
        </p>
        <div className={styles.uuidBox}>
          <div className={styles.uuidLbl}>YOUR HERO ID</div>
          <div className={styles.uuidVal}>#{uuid}</div>
        </div>
        <p className={styles.successNote}>
          Keep this code to access your character sheet.
        </p>
        <div
          className="btn-row"
          style={{ justifyContent: 'center', marginTop: 24 }}
        >
          <button
            className="rs-btn rs-btn-ghost"
            onClick={() => router.push(`/pages/character?uuid=${uuid}`)}
          >
            Go to hero page
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main page ── */
export default function Home() {
  const [step, setStep] = useState(1)
  const [selectedClass, setSelectedClass] = useState(null)
  const [character, setCharacter] = useState(null)
  const [createdUuid, setCreatedUuid] = useState(null)
  const [createdPortrait, setCreatedPortrait] = useState(null)
  const [previewPortrait, setPreviewPortrait] = useState(null)

  // initDB()

  const handleConfirm = async () => {
    const uuid = genUuid()
    const heroSchema = {
      name: character.name,
      title: character.title,
      classname: selectedClass.id,
      uuid,
      ...selectedClass.stats,
    }
    const portrait = await submitCharacter(heroSchema, uuid, previewPortrait)
    setCreatedUuid(uuid)
    setCreatedPortrait(portrait)
    setStep('done')
  }

  return (
    <div className={styles.page}>
      <Embers />
      <div className={styles.root}>
        <div className={styles.hdr}>
          <div className={styles.hdrLogo}>Stagscape</div>
          <div className={styles.hdrSub}>Tabletop RPG Companion</div>
        </div>

        <div className="divider" style={{ width: '100%', maxWidth: 700 }} />

        {step !== 'done' && <StepIndicator step={step} />}

        {step === 1 && (
          <Step1
            selected={selectedClass}
            onSelect={setSelectedClass}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2
            selectedClass={selectedClass}
            onBack={() => setStep(1)}
            onNext={async (char) => {
              setCharacter(char)
              const p = await peekPortrait()
              setPreviewPortrait(p)
              setStep(3)
            }}
          />
        )}
        {step === 3 && (
          <Step3
            character={character}
            selectedClass={selectedClass}
            portrait={previewPortrait}
            onBack={() => setStep(2)}
            onConfirm={handleConfirm}
          />
        )}
        {step === 'done' && (
          <SuccessScreen
            character={character}
            selectedClass={selectedClass}
            uuid={createdUuid}
            portrait={createdPortrait}
          />
        )}

        <div className="footer">STAGSCAPE · CAMPAIGN COMPANION · 2026</div>
      </div>
    </div>
  )
}
