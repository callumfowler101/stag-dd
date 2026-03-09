'use client'

import styles from '../styles.module.css'
import { updateStatOnCharacter } from '../../../../server_actions/updateStatOnCharacter.js'

export default function PlayerCell({ data }) {
  const giveXP = ({ uuid, experience }) => {
    console.log('xp click')
    const currXP = experience
    const xpInc = document.getElementById(`xp-amount-${uuid}`).value
    const newXP = Number(xpInc) + currXP

    const update = { experience: newXP }

    console.log(update)
    updateStatOnCharacter(uuid, update)
    data.experience = newXP
  }
  return (
    <>
      <div className={styles.cell}>
        <p>{data.name}</p>
        <input type="text" id={`xp-amount-${data.uuid}`}></input>
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
