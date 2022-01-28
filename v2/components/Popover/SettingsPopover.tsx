import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import {
  faCog,
  faExclamationTriangle,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BasePopover from './BasePopover'

const SettingsPopover: FunctionComponent = () => {
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
    <BasePopover
      popoverButton={
        <span className='cursor-pointer ml-5 text-white text-lg'>
          <FontAwesomeIcon icon={faCog} />
        </span>
      }
      popoverPanel={
        <div
          className={`${classNamesLib.popoverWrapper} ${classNamesLib.popoverWrapperDark}`}
        >
          <div className={`${classNamesLib.popoverBody}`}>
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
      }
    />
  )
}

export default SettingsPopover
