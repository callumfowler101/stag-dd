'use client'
import styles from './character_page.module.css'
import { getCharacter } from '../../../server_actions/getCharacter.js'
import { getUnreadNotifications } from '../../../server_actions/getUnreadNotifications.js'
import { setNotificationAsRead } from '../../../server_actions/setNotificationAsRead.js'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function CharacterContent() {
  const [data, setData] = useState(undefined)
  const [notification, setNotification] = useState(undefined)
  const searchParams = useSearchParams()
  const uuid = searchParams.get('uuid')

  const loadData = async () => {
    console.log('getting data')
    const _data = await getCharacter(uuid)
    console.log('data retrieved')
    setData(_data)
  }

  const loadNotifications = async () => {
    console.log('getting notifications')
    const notifications = await getUnreadNotifications()
    console.log('notifications retrieved')
    if (notifications.length > 0) {
      setNotification(notifications[0])
    }
  }

  const closeNotification = () => {
    setNotificationAsRead(notification.uuid)
    setNotification(undefined)
  }

  useEffect(() => {
    loadData()
    loadNotifications()
  }, [])

  // const data = getEntry(uuid)
  // console.log(`is window here: ${localStorage}`)

  // console.log(hero)
  // initCharacterToDb(hero)

  return (
    <div className={styles.container}>
      {notification ? (
        <div
          id="notification-hub"
          className={styles.notification_hub}
          onClick={closeNotification}
        >
          <h3>{notification.title}</h3>
          <p>{notification.body}</p>
        </div>
      ) : (
        <></>
      )}
      {data ? (
        <>
          <h2>{data.name}</h2>
          <h3>Stats</h3>
          <ul>
            {Object.entries(data).map((data, idx) => {
              console.log(data)
              if (typeof data[1] === 'number' && data[0] !== '__v') {
                return <li key={idx}>{`${data[0]}: ${data[1]}`}</li>
              } else {
                return
              }
            })}
          </ul>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </div>
  )
}

export default function CharacterPage() {
  return (
    <Suspense fallback={<h3>Loading...</h3>}>
      <CharacterContent />
    </Suspense>
  )
}
