import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import { createPopper } from '@popperjs/core'
import {
  faCog,
  faExclamationTriangle,
  faPlus,
  faRedoAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const UserPopover: FunctionComponent = () => {
  const [popoverShow, setPopoverShow] = React.useState(false)
  const btnRef: React.RefObject<HTMLButtonElement> = React.createRef()
  const popoverRef: React.RefObject<HTMLDivElement> = React.createRef()

  const [isSignedUp, setIsOpenSettingsDialog, nodeActive] = useStore(
    (state) => [
      state.isSignedUp,
      state.setIsOpenSettingsDialog,
      state.nodeActive,
    ],
    shallow
  )
  const [userName, setIsSignedUp] = useStore(
    (state) => [state.userName, state.setIsSignedUp],
    shallow
  )

  const openPopover = (): void => {
    if (!btnRef.current || !popoverRef.current) return // let the typechecker know it will not be null

    createPopper(btnRef.current, popoverRef.current, {
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
    setPopoverShow(true)
  }

  const closePopover = (): void => {
    setPopoverShow(false)
  }

  const setIsSignedUpWithToast = (): void => {
    closePopover()
    setIsSignedUp(false)
    // https://fkhadra.github.io/react-toastify/introduction/
    toast('Logging out...')
  }

  return (
    <>
      <button
        type='button'
        onClick={popoverShow ? closePopover : openPopover}
        ref={btnRef}
        className='cursor-pointer ml-5 text-white text-lg'
      >
        {isSignedUp && <FontAwesomeIcon icon={faUser} />}
        {!isSignedUp && <FontAwesomeIcon icon={faUserPlus} />}
      </button>
      <div
        className={`
          ${classNamesLib.popoverWrapper}
          ${classNamesLib.popoverWrapperDark}
          ${popoverShow ? '' : 'hidden'}`}
        ref={popoverRef}
      >
        {isSignedUp && (
          <>
            <div className={`${classNamesLib.popoverHeader}`}>
              <div className={`${classNamesLib.popoverHeaderLabel}`}>
                <span>Logged in as</span>
              </div>
              <div className={`${classNamesLib.popoverHeaderName}`}>
                {userName}
              </div>
            </div>
            <div className={`${classNamesLib.popoverBody}`}>
              <button
                type='button'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsOpenSettingsDialog(true)
                  closePopover()
                }}
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faCog} />
                <span>Node Settings</span>
                {!nodeActive && (
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className='fixed right-4 animate-pulse text-yellow-500'
                  />
                )}
              </button>
              <button
                onClick={setIsSignedUpWithToast}
                type='button'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            </div>
          </>
        )}
        {!isSignedUp && (
          <>
            <div className={`${classNamesLib.popoverBody}`}>
              <button
                type='button'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Sign up</span>
              </button>
            </div>
            <div className={`${classNamesLib.popoverBody}`}>
              <button
                type='button'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faRedoAlt} />
                <span>Recover account</span>
              </button>
            </div>
            <div className={`${classNamesLib.popoverBody}`}>
              <button
                type='button'
                onClick={() => {
                  setIsOpenSettingsDialog(true)
                  closePopover()
                }}
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faCog} />
                <span>Node Settings</span>
                {!nodeActive && (
                  <FontAwesomeIcon
                    icon={faExclamationTriangle}
                    className='fixed right-4 animate-pulse text-yellow-500'
                  />
                )}
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default UserPopover
