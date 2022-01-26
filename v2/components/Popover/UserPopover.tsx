import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import {
  faPlus,
  faRedoAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BasePopover from './BasePopover'

const UserPopover: FunctionComponent = () => {
  const [
    setIsOpenSignupDialog,
    setIsOpenRecoverDialog,
    isSignedUp,
    setIsSignedUp,
    userName,
  ] = useStore(
    (state) => [
      state.setIsOpenSignupDialog,
      state.setIsOpenRecoverDialog,
      state.isSignedUp,
      state.setIsSignedUp,
      state.userName,
    ],
    shallow
  )

  const setIsSignedUpWithToast = (): void => {
    setIsSignedUp(false)
    localStorage.removeItem('account_private_key')
    toast('Logging out...')
  }

  return (
    <BasePopover
      popoverButton={
        <span className='cursor-pointer ml-5 text-white text-lg'>
          {isSignedUp && <FontAwesomeIcon icon={faUser} />}
          {!isSignedUp && <FontAwesomeIcon icon={faUserPlus} />}
        </span>
      }
      popoverPanel={
        <div className={`${classNamesLib.popoverWrapper} ${classNamesLib.popoverWrapperDark}`}>
        {isSignedUp && (
          <div className={`${classNamesLib.popoverHeader}`}>
            <div className={`${classNamesLib.popoverHeaderLabel}`}>
              <span>Logged in as</span>
            </div>
            <div className={`${classNamesLib.popoverHeaderName}`}>
              {userName}
            </div>
          </div>
        )}
        <div className={`${classNamesLib.popoverBody}`}>
          {isSignedUp && (
            <button
              type='button'
              className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
            >
              <FontAwesomeIcon icon={faUser} />
              <span>Profile</span>
            </button>
          )}
          {!isSignedUp && (
            <>
              <button
                type='button'
                onClick={() => {
                  setIsOpenSignupDialog(true)
                }}
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faPlus} />
                <span>Sign up</span>
              </button>
              <button
                type='button'
                onClick={() => {
                  setIsOpenRecoverDialog(true)
                }}
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faRedoAlt} />
                <span>Recover account</span>
              </button>
            </>
          )}
          {isSignedUp && (
            <button
              onClick={setIsSignedUpWithToast}
              type='button'
              className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </button>
          )}
        </div>
      </div>
      }
    />
  )
}

export default UserPopover
