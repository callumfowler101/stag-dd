'use client'

import { useState } from 'react'

export default function ClassCard(data) {
  const [clicked, setClicked] = useState(false)

  const onClick = () => {
    setClicked(!clicked)
  }
  return (
    <div key={`${data.classname}`}>
      {clicked ? (
        <h2 onClick={onClick}>clicked</h2>
      ) : (
        <h2 onClick={onClick}>{data.classname}</h2>
      )}
    </div>
  )
}
