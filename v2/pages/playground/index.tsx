import React, { FunctionComponent, useEffect, useState } from 'react'
import Gun from 'gun/gun' // https://gun.eco https://codesandbox.io/s/react-playground-forked-dceh9?file=/index.js
import { classNamesLib } from 'components/ClassNames/ClassNames'
import Header from 'components/Header/Header'
import { inBrowser } from 'lib/where'

const gun = Gun({
  peers: inBrowser
    ? [
        'https://bullchat.syon.ca/gun',
        // 'http://localhost:3001/gun/',
        // `${location.origin}/gun`,
        // `${location.origin}/api/gun`,
      ]
    : [],
})
// global.gun = gun // for debugging

const Playground: FunctionComponent = () => {
  const [inputText, setInputText] = useState('')
  const [items, setItems] = useState([])
  // console.log(items)

  // .open() instead of .map().on() might be something to have a look at
  useEffect(
    () =>
      gun
        .get('items')
        .map()
        .on((text, id) =>
          setItems((oldItems) => [{ text, id }, ...oldItems])
        ).off,
    []
  )

  return (
    <>
      <Header />
      <div className={classNamesLib.container}>
        <div className={classNamesLib.feedWrapper}>
          <div
            className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark}`}
          >
            <div className={classNamesLib.feedItemInner}>
              <div className='flex gap-x-3'>
                <input
                  type='text'
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
                />
                <button
                  type='button'
                  onClick={() => {
                    gun.get('items').set(inputText as any)
                    setInputText('')
                  }}
                  className={`${classNamesLib.button} ${classNamesLib.buttonDecensored}`}
                >
                  Submit
                </button>
                <button
                  type='button'
                  onClick={() => {
                    gun.get('items').set(null)
                    setInputText('')
                  }}
                  className={`${classNamesLib.button} ${classNamesLib.buttonDecensored}`}
                >
                  Submit (null)
                </button>
              </div>
            </div>
          </div>
          {Object.values(items)
            .filter((item) => typeof item.text === 'string')
            .map((item) => (
              <div
                key={item.id}
                className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark}`}
              >
                <div className={classNamesLib.feedItemInnerTop}>
                  <div className={classNamesLib.feedItemMetaWrapper}>
                    <div
                      className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
                    >
                      &lt;Username&gt;
                    </div>
                  </div>
                </div>
                <div className={classNamesLib.feedItemInnerBottom}>
                  {item.text}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Playground
