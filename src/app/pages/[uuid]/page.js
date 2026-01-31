'use client'

import styles from './character_page.module.css'
import { useParams } from 'next/navigation'
import { getEntry } from '../../../scripts/tempDb.js'

export default function CharacterPage({ searchParams }) {
  const { uuid } = useParams()
  const data = getEntry(uuid)

  return (
    <div className={styles.container}>
      <h2>{data.name}</h2>
      <h3>Stats</h3>
      <ul>
        {Object.entries(data.stats).map((data, idx) => {
          console.log(data)

          return <li key={idx}>{`${data[0]}: ${data[1]}`}</li>
        })}
      </ul>
    </div>
  )
}
