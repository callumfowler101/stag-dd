'use server'

import { initCharacterToDb, assignPortrait } from '../scripts/database.js'

export async function submitCharacter(heroSchema, uuid) {
  console.log('submitting character to db')
  await initCharacterToDb(heroSchema, uuid)
  const portrait = await assignPortrait(uuid)
  return portrait
}
