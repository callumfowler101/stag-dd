'use client'

import styles from '../styles.module.css'

export default function PlayerCell({ data }) {
  const giveXP = (playerUUID) => {
    console.log(`Give ${playerUUID} 5XP`)
  }
  return (
    <>
      <div className={styles.cell}>
        <p>{data.name}</p>
        <button
          onClick={() => {
            giveXP(data.uuid)
          }}
        >
          Give XP
        </button>
        <button>View Stats</button>
      </div>
    </>
  )
}
