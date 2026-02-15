'use client'
import { redirect, RedirectType } from 'next/navigation'
import { pushEntry } from '../scripts/tempDb.js'
// import { initCharacterToDb } from '../scripts/database.js'

import { submitCharacter } from '../server_actions/submitCharacter.js'

import classes from '../stores/classes'
import styles from './character_form.module.css'

const titles = ['the Marauder', 'the Valiant', 'the Wordsmith']

export default function CharacterForm() {
  const onSubmit = (e) => {
    e.preventDefault()
    const name = document.getElementById('name').value
    const title = document.getElementById('title-select').value
    const classType = document.getElementById('class-select').value

    const fullName = `${name} ${title}`
    console.log(`${fullName} is a ${classType}`)

    const uuid = Math.floor(Math.random() * 1000000)

    const heroSchema = classes[classType]
    heroSchema.name = fullName
    heroSchema.uuid = uuid

    // pushEntry(uuid, heroSchema)

    // initCharacterToDb(heroSchema, uuid)
    console.log('hero init')
    submitCharacter(heroSchema, uuid)

    redirect(`/pages/${uuid}?uuid=${uuid}`)
  }

  return (
    <form className={styles.container}>
      <div>
        <label htmlFor="name">Name: </label>
        <input type="text" id="name" name="name" />
        <select id="title-select">
          {titles.map((e) => {
            return <option key={`${e}_option`}>{e}</option>
          })}
        </select>
      </div>
      <div>
        <label htmlFor="class">Class: </label>
        <select id="class-select">
          {Object.values(classes).map((e) => {
            return <option key={`${e.classname}_option`}>{e.classname}</option>
          })}
        </select>
      </div>
      <input
        className={styles.submit_btn}
        type="submit"
        value="Create"
        onClick={onSubmit}
      />
    </form>
  )
}
