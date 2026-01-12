'use client'

import classes from '../stores/classes'
import styles from './pick_class.module.css'
import { useState } from 'react'

export default function PickClass() {
  const [clicked, setClicked] = useState(false)
  const [clickedClass, setClickedClass] = useState('undefined')

  const classClicked = (classname) => {
    setClickedClass(classname)
    setClicked(!clicked)
  }

  return (
    <div className={styles.container}>
      {!clicked ? (
        <div className={styles.classlist}>
          {Object.values(classes).map((e, i) => {
            return (
              <h2
                key={e.classname}
                onClick={() => {
                  classClicked(e.classname)
                }}
              >
                {e.classname}
              </h2>
            )
          })}
        </div>
      ) : (
        <div>
          <p
            onClick={() => {
              classClicked('undefined ')
            }}
          >
            {classes[clickedClass].info}
          </p>
        </div>
      )}
    </div>
  )
}
