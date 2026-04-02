'use client'
import styles from './character_page.module.css'
import { getCharacter } from '../../../server_actions/getCharacter.js'
import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function CharacterContent() {
  const [data, setData] = useState(undefined)
  const searchParams = useSearchParams()
  const uuid = searchParams.get('uuid')

  useEffect(() => {
    const loadData = async () => {
      console.log('getting data')
      const _data = await getCharacter(uuid)
      console.log('data retrieved')
      setData(_data)
    }

    loadData()
  }, [])

  // const data = getEntry(uuid)
  // console.log(`is window here: ${localStorage}`)

  // console.log(hero)
  // initCharacterToDb(hero)

  return (
    <div className={styles.container}>
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
