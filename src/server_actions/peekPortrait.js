'use server'

import { peekPortrait as peekPortraitFromDb } from '../scripts/database.js'

export async function peekPortrait() {
  return peekPortraitFromDb()
}
