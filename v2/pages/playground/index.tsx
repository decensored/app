import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import GUN from 'gun/gun'
import {
  faComment,
  faShare,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Header from '../../components/Header/Header'

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
              </div>
            </div>
          </div>
          {Object.values(items).map((item) => (
            <div
              key={item.id}
              className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark}`}
            >
              <div className={classNamesLib.feedItemInnerTop}>
                <div className={classNamesLib.feedItemMetaWrapper}>
                  <div
                    className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
                  >
                    Username
                  </div>
                  <div className={classNamesLib.feedItemMetaTimestamp}>22 min</div>
                </div>
                <div className={`${classNamesLib.feedItemText} ${classNamesLib.feedItemTextDark}`}>{item.text}</div>
              </div>
              <div className={classNamesLib.feedItemInnerBottom}>
                <div className={classNamesLib.feedItemInnerBottomCol}>
                  <FontAwesomeIcon
                    icon={faShieldAlt}
                    className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
                  />
                </div>
                <div className={classNamesLib.feedItemInnerBottomCol}>
                  <FontAwesomeIcon
                    icon={faComment}
                    className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
                  />
                  <FontAwesomeIcon
                    icon={faShare}
                    className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Playground
