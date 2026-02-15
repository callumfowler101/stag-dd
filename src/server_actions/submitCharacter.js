'use server'

import { initCharacterToDb } from '../scripts/database.js'

export async function submitCharacter(heroSchema, uuid) {
  console.log('submitting character to db')
  initCharacterToDb(heroSchema, uuid)
}
