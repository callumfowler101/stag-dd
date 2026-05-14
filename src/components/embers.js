'use client'
import { useRef } from 'react';

export default function Embers() {
  const pts = useRef(
    Array.from({ length: 16 }, (_, i) => ({
      key: i,
      left:     `${((i * 6.5) + (i % 3) * 3.7) % 100}%`,
      delay:    `${(i * 1.15) % 14}s`,
      duration: `${10 + (i * 1.4) % 9}s`,
      size:     `${1.1 + (i % 4) * 0.35}px`,
      drift:    `${((i % 5) - 2) * 28}px`,
    }))
  ).current;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {pts.map((p) => (
        <div key={p.key} style={{
          position: 'absolute', bottom: '-4px', left: p.left,
          width: p.size, height: p.size, borderRadius: '50%',
          background: 'var(--gold)', opacity: 0,
          animation: `ember ${p.duration} ${p.delay} ease-in infinite`,
          '--drift': p.drift,
        }} />
      ))}
    </div>
  );
}
