'use server'

import { addNotificationToDb } from '../scripts/database.js'

export async function sendNotification(notificationSchema, uuid) {
  console.log('sending notification to db')
  addNotificationToDb(notificationSchema, uuid)
}
