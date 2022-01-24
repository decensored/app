import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import GUN from 'gun/gun'

const gun = GUN()

const Playground: NextPage = () => {
  const [inputText, setInputText] = useState('')
  const [items, setItems] = useState([])
  // console.log(items)

  useEffect(
    () =>
      gun
        .get('items')
        .map()
        .on((text: string, id: string) =>
          setItems((oldItems) => [{ text, id }, ...oldItems])
        ).off,
    []
  )

  return (
    <>
      <input
        type='text'
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <br />
      <button
        type='button'
        onClick={() => {
          gun.get('items').set(inputText as any)
          setInputText('')
        }}
        className={classNamesLib.button}
      >
        Submit
      </button>

      <hr />

      <ul>
        {Object.values(items).map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </>
  )
}

export default Playground
