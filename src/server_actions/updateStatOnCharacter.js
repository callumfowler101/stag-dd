'use server'

import { updateCharacterStat } from '../scripts/database.js'

export async function updateStatOnCharacter(uuid, update) {
  console.log('updating stat')
  const success = await updateCharacterStat(uuid, update)
  if (success) console.log('update successful')
  else console.log('error on update')
}
