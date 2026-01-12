import Image from 'next/image'
import styles from './page.module.css'

import InfoCard from '../components/info_card.js'
import PickClass from '../components/pick_class.js'
import CharacterForm from '../components/character_form.js'

const dataIsInitialised = false

export default function Home() {
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
