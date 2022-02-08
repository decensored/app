/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Gun from 'gun/gun' // https://gun.eco https://codesandbox.io/s/react-playground-forked-dceh9?file=/index.js
import 'gun/lib/open' // https://gun.eco https://codesandbox.io/s/react-playground-forked-dceh9?file=/index.js
import BottomNavigation from 'components/Navigation/BottomNavigation'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import { style } from 'styles/style'
import Header from 'components/Scaffolding/Header'
import { inBrowser } from 'lib/where'

// https://github.com/irislib/iris-lib

const gun = Gun({
  peers: inBrowser
    ? [
        'https://bullchat.syon.ca/gun',
        'https://gunjs.herokuapp.com/gun',
        'https://notabug.io/gun',
        'https://gun-manhattan.herokuapp.com/gun',
        'https://gun-us.herokuapp.com/gun',
        // 'http://localhost:3001/gun',
        // 'http://localhost:8765/gun',
        // `${window.origin}/gun`,
        // `${window.origin}/api/gun`,
      ]
    : [],
})
global.gun = gun // for debugging

const NAMESPACE = 'decensored'

const Playground = () => {
  const router = useRouter()
  const { roomId } = router.query

  const [inputText, setInputText] = useState('')
  const [items, setItems] = useState([])
  // console.log('items', items)

  useEffect(() => {
    const getter = gun.get(NAMESPACE).get(roomId)

    getter.open((data) => {
      const items = Object.values(data)
        .filter((item) => !!item) // filter out deleted values which will appear as null
        .reverse()
      setItems(items)
    })

    // I don't know why "return getter.off" doesn't work when going to another page
    return () => {
      getter.off()
    }
  }, [roomId])

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1}`}>
          <AsideNavigation />
        </div>
        <div className={style.bodyContainerCol2}>
          <div className={style.feedWrapper}>
            <div className={`${style.feedItemWrapper} ${style.feedItemWrapperDark}`}>
              <div className={style.feedItemInner}>
                {roomId}
                <div className='flex gap-x-3'>
                  <input
                    type='text'
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className={`
                      ${style.input}
                      ${style.inputDefault}
                      ${style.inputDefaultDark}
                      ${style.inputFocus}
                    `}
                  />
                  <button
                    type='button'
                    onClick={() => {
                      const randomId = `id_${Date.now()}`
                      gun.get(NAMESPACE).get(roomId).get(randomId).put({ text: inputText, id: randomId })
                      setInputText('')
                    }}
                    className={`${style.button} ${style.buttonDecensored}`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>

            {items.map((item) => (
              <div key={`item-${item.id}`} className={`${style.feedItemWrapper} ${style.feedItemWrapperDark}`}>
                <div className={style.feedItemInnerTop}>
                  <div className={style.feedItemMetaWrapper}>
                    <div className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}>
                      <button
                        type='button'
                        onClick={() => {
                          gun.get(NAMESPACE).get(roomId).get(item.id).put(null)
                        }}
                        className={`${style.button} ${style.buttonDecensored}`}
                      >
                        Delete
                      </button>
                      {/* &lt;Username&gt; */}
                    </div>
                  </div>
                </div>
                <div className={style.feedItemInnerBottom}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation />
    </>
  )
}

export default Playground
