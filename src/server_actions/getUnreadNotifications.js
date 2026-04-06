'use server'

import { getAllUnreadNotifications } from '../scripts/database.js'

export async function getUnreadNotifications() {
  console.log('getting unread notifications from db')
  return new Promise(async (res, rej) => {
    const result = await getAllUnreadNotifications()
    const data = JSON.parse(JSON.stringify(result))
    res(data)
  })
}
