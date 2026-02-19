'use server'

import { getCharacterFromDb } from '../scripts/database.js'

export async function getCharacter(uuid) {
  console.log('getting character from db')
  return new Promise(async (res, rej) => {
    const result = await getCharacterFromDb(uuid)
    const data = JSON.parse(JSON.stringify(result))
    res(data)
  })
}
