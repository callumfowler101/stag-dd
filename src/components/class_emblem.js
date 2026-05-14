export default function ClassEmblem({ id }) {
  const s = { fill: 'none', stroke: 'currentColor', strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (id) {
    case 'elf':
      return (
        <svg viewBox="0 0 200 72" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 10 Q118 24 114 46 Q108 60 100 58 Q92 60 86 46 Q82 24 100 10Z" {...s} strokeWidth="1.3" opacity="0.68"/>
          <line x1="100" y1="12" x2="100" y2="56" {...s} strokeWidth="0.75" opacity="0.45"/>
          <line x1="100" y1="28" x2="111" y2="34" {...s} strokeWidth="0.7" opacity="0.38"/>
          <line x1="100" y1="28" x2="89"  y2="34" {...s} strokeWidth="0.7" opacity="0.38"/>
          <line x1="100" y1="40" x2="109" y2="45" {...s} strokeWidth="0.7" opacity="0.28"/>
          <line x1="100" y1="40" x2="91"  y2="45" {...s} strokeWidth="0.7" opacity="0.28"/>
          <line x1="14"  y1="36" x2="76"  y2="36" {...s} strokeWidth="0.6" opacity="0.25"/>
          <line x1="124" y1="36" x2="186" y2="36" {...s} strokeWidth="0.6" opacity="0.25"/>
          <path d="M14 34 L18 36 L14 38Z" fill="currentColor" opacity="0.25"/>
          <path d="M186 34 L182 36 L186 38Z" fill="currentColor" opacity="0.25"/>
        </svg>
      );
    case 'dwarf':
      return (
        <svg viewBox="0 0 200 72" xmlns="http://www.w3.org/2000/svg">
          <polygon points="100,10 128,56 72,56" {...s} strokeWidth="1.3" opacity="0.68"/>
          <polygon points="100,22 118,52 82,52" {...s} strokeWidth="0.75" opacity="0.35"/>
          <line x1="100" y1="12" x2="100" y2="54" {...s} strokeWidth="0.6" opacity="0.28"/>
          <line x1="66"  y1="58" x2="134" y2="58" {...s} strokeWidth="0.6" opacity="0.3"/>
          <circle cx="100" cy="58" r="1.5" fill="currentColor" opacity="0.35"/>
          <line x1="14" y1="36" x2="62" y2="36" {...s} strokeWidth="0.6" opacity="0.22"/>
          <line x1="138" y1="36" x2="186" y2="36" {...s} strokeWidth="0.6" opacity="0.22"/>
          <path d="M14 34 L18 36 L14 38Z" fill="currentColor" opacity="0.22"/>
          <path d="M186 34 L182 36 L186 38Z" fill="currentColor" opacity="0.22"/>
        </svg>
      );
    case 'fisherman':
      return (
        <svg viewBox="0 0 200 72" xmlns="http://www.w3.org/2000/svg">
          <line x1="62" y1="12" x2="126" y2="18" {...s} strokeWidth="1.4" opacity="0.6"/>
          <circle cx="62" cy="12" r="2.5" fill="currentColor" opacity="0.5"/>
          <line x1="124" y1="18" x2="122" y2="34" {...s} strokeWidth="0.8" opacity="0.5"/>
          <path d="M122 34 Q122 52 110 52 Q98 52 98 42 Q98 34 106 34 Q112 34 112 40 Q112 46 108 46" {...s} strokeWidth="1.2" opacity="0.68"/>
          <path d="M108 46 Q104 46 102 50" {...s} strokeWidth="1.3" opacity="0.65"/>
          <path d="M14 48 Q20 43 26 48 Q32 53 38 48 Q44 43 50 48" {...s} strokeWidth="0.7" opacity="0.25"/>
          <path d="M150 48 Q156 43 162 48 Q168 53 174 48 Q180 43 186 48" {...s} strokeWidth="0.7" opacity="0.25"/>
        </svg>
      );
    case 'dungeon_master':
      return (
        <svg viewBox="0 0 200 72" xmlns="http://www.w3.org/2000/svg">
          <path d="M72 56 L72 40 L84 22 L92 36 L100 14 L108 36 L116 22 L128 40 L128 56 Z" {...s} strokeWidth="1.3" opacity="0.68"/>
          <line x1="70" y1="57" x2="130" y2="57" {...s} strokeWidth="1.5" opacity="0.55"/>
          <circle cx="84"  cy="48" r="2"   fill="currentColor" opacity="0.48"/>
          <circle cx="100" cy="46" r="2.5" fill="currentColor" opacity="0.55"/>
          <circle cx="116" cy="48" r="2"   fill="currentColor" opacity="0.48"/>
          <path d="M14 34 L48 34 Q52 32 52 36 Q52 40 48 38 L44 38" {...s} strokeWidth="0.7" opacity="0.25"/>
          <path d="M186 34 L152 34 Q148 32 148 36 Q148 40 152 38 L156 38" {...s} strokeWidth="0.7" opacity="0.25"/>
        </svg>
      );
    default:
      return null;
  }
}
