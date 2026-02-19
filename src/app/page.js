import Image from 'next/image'
import styles from './page.module.css'

import InfoCard from '../components/info_card.js'
import PickClass from '../components/pick_class.js'
import CharacterForm from '../components/character_form.js'

import { redirect } from 'next/navigation'

import { initDB, entryExists } from '../scripts/database.js'

const dataIsInitialised = false

export default async function Home({ searchParams }) {
  const params = await searchParams

  initDB()
  console.log('bang')

  const doesEntryExists = (await entryExists(params.uuid)) ? true : false

  if (doesEntryExists) redirect(`/pages/character?uuid=${params.uuid}`)

  // console.log(`Entry exists: ${JSON.stringify(doesEntryExists)}`)

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {dataIsInitialised ? (
          <InfoCard />
        ) : (
          <>
            <PickClass />
            <CharacterForm />
          </>
        )}
      </main>
    </div>
  )
}
