'use client'

import styles from '../styles.module.css'
import { sendNotification } from '../../../../server_actions/sendNotification.js'

export default function NotificationCentre() {
  const onSubmit = (e) => {
    e.preventDefault()
    const title = document.getElementById('title').value
    const body = document.getElementById('body').value
    const uuid = `notification_${Math.floor(Math.random() * 1000000) + 1000000}`

    const notificationSchema = {
      title,
      body,
      type: 'event',
      read: false,
      uuid,
    }

    console.log(notificationSchema)

    sendNotification(notificationSchema, uuid)
  }

  return (
    <div className={styles.notificationContainer}>
      <form>
        <label htmlFor="title">Title: </label>
        <input type="text" id="title" name="title" />
        <label htmlFor="body">Body: </label>
        <input type="text" id="body" name="body" />
        <input
          className={styles.notificationSbmtBtn}
          type="submit"
          value="Create"
          onClick={onSubmit}
        />
      </form>
    </div>
  )
}
