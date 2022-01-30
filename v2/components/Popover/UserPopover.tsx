import React, { FunctionComponent, useState } from 'react'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { style } from 'styles/style'
import { isMobile } from 'react-device-detect'
import Link from 'next/link'
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
          <div className={`${style.popoverWrapper} ${style.popoverWrapperDark}`}>
          {isSignedUp && (
            <div className={`${style.popoverHeader}`}>
              <div className={`${style.popoverHeaderLabel}`}>
                <span>Logged in as</span>
              </div>
              <div className={`${style.popoverHeaderName}`}>
                {userName}
              </div>
            </div>
          )}
          <div className={`${style.popoverBody}`}>
            {/* {isSignedUp && (
              <button
                type='button'
                className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
              >
                <SVGIcon icon='faUser'isFixed />
                <span>Profile</span>
              </button>
            )} */}

            {isSignedUp && isMobile && (
              <Link href={`/user/${userName}`} passHref>
                <button
                  type='button'
                  className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
                >
                  <SVGIcon icon='faUserAstronaut'isFixed />
                  <span>My Posts</span>
                </button>
              </Link>
            )}

            {!isSignedUp && (
              <>
                <button
                  type='button'
                  onClick={() => setOpenSignupDialog(true)}
                  className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
                >
                  <SVGIcon icon='faPlus' />
                  <span>Sign up</span>
                </button>
                <button
                  type='button'
                  onClick={() => setOpenRecoverDialog(true)}
                  className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
                >
                  <SVGIcon icon='faRedoAlt' isFixed />
                  <span>Recover account</span>
                </button>
              </>
            )}

            {isSignedUp && (
              <button
                onClick={setIsSignedUpWithToast}
                type='button'
                className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
              >
                <SVGIcon icon='faSignOutAlt' isFixed />
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
