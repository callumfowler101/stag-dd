'use client'

import styles from '../styles.module.css'
import { updateStatOnCharacter } from '../../../../server_actions/updateStatOnCharacter.js'
import { sendNotification } from '../../../../server_actions/sendNotification.js'

export default function PlayerCell({ data }) {
  const giveXP = ({ uuid, experience }) => {
    console.log('xp click')
    const currXP = experience
    const xpInc = document.getElementById(`xp-amount-${uuid}`).value
    const newXP = Number(xpInc) + currXP

    const update = { experience: newXP }

    const title = 'XP Gained'
    const body = document.getElementById(`xp-message-${uuid}`).value
    const notificationUuid = `notification_${
      Math.floor(Math.random() * 1000000) + 1000000
    }`

    const notificationSchema = {
      title,
      body,
      type: 'event',
      read: false,
      uuid: notificationUuid,
      userUuid: uuid,
    }

    console.log(update)
    updateStatOnCharacter(uuid, update)
    sendNotification(notificationSchema, notificationUuid)
    data.experience = newXP
  }
  return (
    <>
      <div className={styles.cell}>
        <p>{data.name}</p>
        <input type="text" id={`xp-amount-${data.uuid}`}></input>
        <input type="text" id={`xp-message-${data.uuid}`}></input>
        <button
          onClick={() => {
            console.log(data)
            giveXP(data)
          }}
        >
          Give XP
        </button>
        <button>View Stats</button>
      </div>
    </>
  )
}
