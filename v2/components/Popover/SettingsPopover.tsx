import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import { faCog, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BasePopover from './BasePopover'

const SettingsPopover: FunctionComponent = () => {
  const [setIsOpenSettingsDialog, contract] = useStore(
    (state) => [state.setIsOpenSettingsDialog, state.contract],
    shallow
  )

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
              {!(contract as any)?.accounts && (
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className='fixed right-4 animate-pulse text-red-500'
                />
              )}
            </button>
          </div>
        </div>
      }
    />
  )
}

export default SettingsPopover
