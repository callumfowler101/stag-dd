import styles from './character_page.module.css'
import { getCharacterFromDb } from '../../../scripts/database.js'
// import { getEntry } from '../../../scripts/tempDb.js'
import { usePath } from 'next/navigation'

export default async function CharacterPage({ searchParams }) {
  const { uuid } = await searchParams

  const data = await getCharacterFromDb(uuid)
  console.log(data)

  // const data = getEntry(uuid)
  // console.log(`is window here: ${localStorage}`)

  // console.log(hero)
  // initCharacterToDb(hero)

  return (
    <div className={styles.container}>
      {/* <h2>{data.name}</h2>
      <h3>Stats</h3>
      <ul>
        {Object.entries(data.stats).map((data, idx) => {
          console.log(data)

          return <li key={idx}>{`${data[0]}: ${data[1]}`}</li>
        })}
      </ul> */}
    </div>
  )
}
