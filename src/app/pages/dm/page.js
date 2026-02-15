import styles from './styles.module.css'
// import { useState } from 'react'

export default function MasterPage() {
  // const [viewUserStats, setViewUserStats] = useState(false)
  // const [viewEventDetails, setViewEventDetails] = useState(false)

  const giveXP = (playerUUID) => {
    console.log(`Give ${playerUUID} 5XP`)
  }

  return (
    <>
      <div className={styles.container}>
        <h2>Dungeon Master Page</h2>
        <div>
          <h3>Players</h3>
          <ul className={styles.sub_container}>
            <div className={styles.cell}>
              <p>P1</p>
              <button
                onClick={() => {
                  giveXP('P1')
                }}
              >
                Give XP
              </button>
              <button>View Stats</button>
            </div>
            <div className={styles.cell}>
              <p>P2</p>
              <button>Give XP</button>
              <button>View Stats</button>
            </div>
            <div className={styles.cell}>
              <p>P3</p>
              <button>Give XP</button>
              <button>View Stats</button>
            </div>
            <div className={styles.cell}>
              <p>P4</p>
              <button>Give XP</button>
              <button>View Stats</button>
            </div>
          </ul>
        </div>
        <div>
          <h3>Events</h3>
          <ul className={styles.sub_container}>
            <li>Action</li>
            <li>Action</li>
            <li>Action</li>
          </ul>
        </div>
      </div>
    </>
  )
}
