'use server'

import { markAsRead } from '../scripts/database.js'

export async function setNotificationAsRead(uuid) {
  console.log('updating stat')
  const success = await markAsRead(uuid)
  if (success) console.log('update successful')
  else console.log('error on update')
}
