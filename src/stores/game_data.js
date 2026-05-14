export const CLASSES = [
  {
    id: 'elf',
    name: 'Elf',
    tagline: 'Swift as the wind, wise as the ancient wood',
    stats: { luck: 60, wisdom: 80, agility: 90, speed: 75, fishing: 20, experience: 0 },
    top: ['agility', 'wisdom', 'speed'],
  },
  {
    id: 'dwarf',
    name: 'Dwarf',
    tagline: 'Unbreakable as stone, fierce as mountain fire',
    stats: { luck: 40, wisdom: 50, agility: 30, speed: 35, fishing: 45, experience: 0 },
    top: ['fishing', 'wisdom', 'luck'],
  },
  {
    id: 'fisherman',
    name: 'Fisherman',
    tagline: 'Patient as still water, cunning as the deep',
    stats: { luck: 85, wisdom: 45, agility: 40, speed: 30, fishing: 95, experience: 0 },
    top: ['fishing', 'luck', 'wisdom'],
  },
  {
    id: 'dungeon_master',
    name: 'Dungeon Master',
    tagline: 'Weaver of fate, architect of worlds',
    stats: { luck: 70, wisdom: 90, agility: 50, speed: 55, fishing: 30, experience: 0 },
    top: ['wisdom', 'luck', 'speed'],
  },
];

export const TITLES = ['the Marauder', 'the Valiant', 'the Wordsmith'];

export const STAT_ORDER = ['luck', 'wisdom', 'agility', 'speed', 'fishing', 'experience'];

export const STAT_COLORS = {
  luck:       'linear-gradient(90deg,#b8902a,#e8c858)',
  wisdom:     'linear-gradient(90deg,#3a7aaa,#6aaad8)',
  agility:    'linear-gradient(90deg,#3a8a3a,#6ac06a)',
  speed:      'linear-gradient(90deg,#a03030,#d06060)',
  fishing:    'linear-gradient(90deg,#2a8878,#5ab8a8)',
  experience: 'linear-gradient(90deg,#884a10,#c07830)',
};

export const XP_PER_LVL = 1000;
export const getLevel    = (xp) => Math.floor(xp / XP_PER_LVL) + 1;
export const getXPPct    = (xp) => ((xp % XP_PER_LVL) / XP_PER_LVL) * 100;
export const getXPToNext = (xp) => XP_PER_LVL - (xp % XP_PER_LVL);
