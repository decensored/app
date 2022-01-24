import React, { FunctionComponent, useState } from 'react'
import shallow from 'zustand/shallow'
import { createPopper } from '@popperjs/core'
import { Popover } from '@headlessui/react'
import {
  faCog,
  faExclamationTriangle,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const SettingsPopover: FunctionComponent = () => {
  const [referenceElement, setReferenceElement] = useState()
  const [popperElement, setPopperElement] = useState()

  createPopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  })

  const [setIsOpenSettingsDialog, nodeActive] = useStore(
    (state) => [state.setIsOpenSettingsDialog, state.nodeActive],
    shallow
  )

  const [isDarkmode, setIsDarkmode] = useStore((state) => [
    state.isDarkmode,
    state.setIsDarkmode,
  ])

  const toggleDarkMode = (): void => {
    if (isDarkmode) {
      setIsDarkmode(false)
    } else {
      setIsDarkmode(true)
    }
  }

  return (
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <button
          type='button'
          className='cursor-pointer ml-5 text-white text-lg'
        >
          <FontAwesomeIcon icon={faCog} />
        </button>
      </Popover.Button>

      <Popover.Panel ref={setPopperElement}>
        <div className={`${classNamesLib.popoverWrapper} ${classNamesLib.popoverWrapperDark}`}>
          <div className={`${classNamesLib.popoverBody}`}>
            <Link href='https://t.co/Lmou3Qx5Ap' passHref>
              <a
                href='dummy-href'
                target='_blank'
                title='discord'
                rel='noreferrer'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faDiscord} className='text-[11px]' />
                <span>Discord</span>
              </a>
            </Link>
            <Link href='https://github.com/decensored/app' passHref>
              <a
                href='dummy-href'
                target='_blank'
                title='github'
                rel='noreferrer'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>Github</span>
              </a>
            </Link>
            <button
              type='button'
              onClick={() => {
                setIsOpenSettingsDialog(true)
              }}
              className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
            >
              <FontAwesomeIcon icon={faCog} />
              <span>Node Settings</span>
              {!nodeActive && (
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className='fixed right-4 animate-pulse text-red-500'
                />
              )}
            </button>
            <button
              type='button'
              onClick={toggleDarkMode}
              className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
            >
              {isDarkmode && (
                <>
                  <FontAwesomeIcon icon={faSun} />
                  <span>Lightmode</span>
                </>
              )}
              {!isDarkmode && (
                <>
                  <FontAwesomeIcon icon={faMoon} />
                  <span>Darkmode</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default SettingsPopover
