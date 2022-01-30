import React, { FunctionComponent, useState } from 'react'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BasePopover from 'components/Popover/BasePopover'
import SignupDialog from 'components/Dialog/SignupDialog'
import RecoverDialog from 'components/Dialog/RecoverDialog'

const UserPopover: FunctionComponent = () => {
  const [openSignupDialog, setOpenSignupDialog] = useState(false)
  const [openRecoverDialog, setOpenRecoverDialog] = useState(false)

  const [
    isSignedUp,
    setIsSignedUp,
    userName,
  ] = useStore(
    (state) => [
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
    <>
      <BasePopover
        popoverButton={
          <span className='cursor-pointer ml-5 text-white text-lg'>
            {isSignedUp && <SVGIcon icon='faUser' />}
            {!isSignedUp && <SVGIcon icon='faUserPlus' />}
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
                <SVGIcon icon='faUser' />
                <span>Profile</span>
              </button>
            )}
            {!isSignedUp && (
              <>
                <button
                  type='button'
                  onClick={() => setOpenSignupDialog(true)}
                  className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
                >
                  <SVGIcon icon='faPlus' />
                  <span>Sign up</span>
                </button>
                <button
                  type='button'
                  onClick={() => setOpenRecoverDialog(true)}
                  className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
                >
                  <SVGIcon icon='faRedoAlt' />
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
                <SVGIcon icon='faSignOutAlt' />
                Logout
              </button>
            )}
          </div>
        </div>
        }
      />
      <SignupDialog
        showDialog={openSignupDialog}
        onClose={() => setOpenSignupDialog(false)}
      />
      <RecoverDialog
        showDialog={openRecoverDialog}
        onClose={() => setOpenRecoverDialog(false)}
      />
    </>
  )
}

export default UserPopover
