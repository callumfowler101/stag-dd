'use server'

import { initCharacterToDb, assignPortrait } from '../scripts/database.js'

export async function submitCharacter(heroSchema, uuid, preferredPortrait = null) {
  console.log('submitting character to db')
  await initCharacterToDb(heroSchema, uuid)
  const portrait = await assignPortrait(uuid, preferredPortrait)
  return portrait
}
