import React, { FunctionComponent, useState } from 'react'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { style } from 'styles/style'
import Link from 'next/link'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import BasePopover from 'components/Popover/BasePopover'
import SignupDialog from 'components/Dialog/SignupDialog'
import ProfileDialog from 'components/Dialog/ProfileDialog'
import RecoverDialog from 'components/Dialog/RecoverDialog'
import SettingsDialog from 'components/Dialog/SettingsDialog'

const UserPopover: FunctionComponent = () => {
  const [openSignupDialog, setOpenSignupDialog] = useState(false)
  const [openRecoverDialog, setOpenRecoverDialog] = useState(false)
  const [openProfileDialog, setOpenProfileDialog] = useState(false)
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false)

  const [contract] = useStore((state) => [state.contract], shallow)

  const [isSignedUp, setIsSignedUp, userName] = useStore(
    (state) => [state.isSignedUp, state.setIsSignedUp, state.userName],
    shallow
  )

  const setIsSignedUpWithToast = (): void => {
    setIsSignedUp(false)
    localStorage.removeItem('account_private_key')
    toast('Logging out...')
  }

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
    <>
      <BasePopover
        popoverButton={
          <span className='cursor-pointer ml-5 text-white text-lg'>
            {isSignedUp && <SVGIcon icon='faUser' />}
            {!isSignedUp && <SVGIcon icon='faUserPlus' />}
          </span>
        }
        popoverPanel={
          <div
            className={`${style.popoverWrapper} ${style.popoverWrapperDark}`}
          >
            {isSignedUp && (
              <div className={`${style.popoverHeader}`}>
                <div className={`${style.popoverHeaderLabel}`}>
                  <span>Logged in as</span>
                </div>
                <div className={`${style.popoverHeaderName}`}>{userName}</div>
              </div>
            )}
            <div className={`${style.popoverBody}`}>
              {isSignedUp && (
                <button
                  type='button'
                  className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
                  onClick={() => setOpenProfileDialog(true)}
                >
                  <SVGIcon icon='faUser' isFixed />
                  <span>Profile</span>
                </button>
              )}

              {isSignedUp && (
                <span className='hide-on-desktop'>
                  <Link href={`/user/${userName}`} passHref>
                    <button
                      type='button'
                      className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
                    >
                      <SVGIcon icon='faUserAstronaut' isFixed />
                      <span>My Posts</span>
                    </button>
                  </Link>
                </span>
              )}

              {!isSignedUp && nodeIsUpAndRunning(contract) && (
                <>
                  <button
                    type='button'
                    onClick={() => setOpenSignupDialog(true)}
                    className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
                  >
                    <SVGIcon icon='faPlus' isFixed />
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

              <button
                type='button'
                onClick={() => setOpenSettingsDialog(true)}
                className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
              >
                <SVGIcon icon='faCog' isFixed />
                <span>Node Settings</span>
                {!nodeIsUpAndRunning(contract) && (
                  <SVGIcon
                    icon='faExclamationTriangle'
                    className='fixed right-4 animate-pulse text-red-500'
                  />
                )}
              </button>

              <button
                type='button'
                onClick={toggleDarkMode}
                className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark} hide-on-desktop`}
              >
                {isDarkmode && (
                  <>
                    <SVGIcon icon='faSun' isFixed />
                    <span>Lightmode</span>
                  </>
                )}
                {!isDarkmode && (
                  <>
                    <SVGIcon icon='faMoon' isFixed />
                    <span>Darkmode</span>
                  </>
                )}
              </button>

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
      {isSignedUp &&(
        <ProfileDialog
          showDialog={openProfileDialog}
          onClose={() => setOpenProfileDialog(false)}
        />
      )}
      <SettingsDialog
        showDialog={openSettingsDialog}
        onClose={() => setOpenSettingsDialog(false)}
      />
    </>
  )
}

export default UserPopover
