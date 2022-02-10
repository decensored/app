import React, { FunctionComponent, useState } from 'react'
import ReactDOM from 'react-dom'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { style } from 'styles/style'
import Link from 'next/link'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import SocialIcons from 'components/Navigation/SocialIcons'
import SignupDialog from 'components/Dialog/SignupDialog'
import AccountDialog from 'components/Dialog/AccountDialog'
import RecoverDialog from 'components/Dialog/RecoverDialog'
import SettingsDialog from 'components/Dialog/SettingsDialog'
import BasePopover from 'components/Popover/BasePopover'
import useScreenSizeQuery from 'hooks/useScreenSizeQuery.js'
// import TrendingHashtags from '../Tags/TrendingHashtags'

const UserNavigation: FunctionComponent = () => {
  const [openSignupDialog, setOpenSignupDialog] = useState(false)
  const [openRecoverDialog, setOpenRecoverDialog] = useState(false)
  const [openAccountDialog, setOpenAccountDialog] = useState(false)
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false)

  const [contract] = useStore((state) => [state.contract], shallow)

  const isSmallerThanMD = useScreenSizeQuery('isSmallerThanMD')

  const [isSignedUp, setIsSignedUp, userName] = useStore(
    (state) => [state.isSignedUp, state.setIsSignedUp, state.userName, state.posts],
    shallow
  )

  const setIsSignedUpWithToast = (): void => {
    setIsSignedUp(false)
    localStorage.removeItem('account_private_key')
    toast('Logging out...')
  }

  const [isDarkmode, setIsDarkmode] = useStore((state) => [state.isDarkmode, state.setIsDarkmode])

  const toggleDarkMode = (): void => {
    if (isDarkmode) {
      setIsDarkmode(false)
    } else {
      setIsDarkmode(true)
    }
  }

  const contentHeader = () => (
    <div className={style.sidebarHeader}>
      <div className={style.sidebarHeaderLabel}>
        <span>Logged in as</span>
      </div>
      <div className={style.sidebarHeaderName}>{userName}</div>
    </div>
  )

  const contentAccountButton = () => (
    <>
      <button
        type='button'
        className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
        onClick={() => setOpenAccountDialog(true)}
      >
        <SVGIcon icon='faIdCardAlt' isFixed />
        <span>Account</span>
      </button>
      <AccountDialog showDialog={openAccountDialog} onClose={() => setOpenAccountDialog(false)} />
    </>
  )

  const contentSignupButton = () => (
    <>
      <button
        type='button'
        onClick={() => setOpenSignupDialog(true)}
        className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
      >
        <SVGIcon icon='faPlus' isFixed />
        <span>Sign up</span>
      </button>
      <SignupDialog showDialog={openSignupDialog} onClose={() => setOpenSignupDialog(false)} />
    </>
  )

  const contentRecoverButton = () => (
    <>
      <button
        type='button'
        onClick={() => setOpenRecoverDialog(true)}
        className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
      >
        <SVGIcon icon='faRedoAlt' isFixed />
        <span>Recover account</span>
      </button>
      <RecoverDialog showDialog={openRecoverDialog} onClose={() => setOpenRecoverDialog(false)} />
    </>
  )

  const contentNodeSettingsButton = () => (
    <>
      <button
        type='button'
        onClick={() => setOpenSettingsDialog(true)}
        className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
      >
        <SVGIcon icon='faCog' isFixed />
        <span>Node Settings</span>
        {!nodeIsUpAndRunning(contract) && (
          <SVGIcon icon='faExclamationTriangle' className='fixed right-4 animate-pulse text-red-500' />
        )}
      </button>
      <SettingsDialog showDialog={openSettingsDialog} onClose={() => setOpenSettingsDialog(false)} />
    </>
  )

  const contentDarkmodeToggleButton = () => (
    <button
      type='button'
      onClick={toggleDarkMode}
      className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
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
  )

  const contentMyPostsButton = () => (
    <Link href={`/user/${userName}`} passHref>
      <button type='button' className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark} ${style.buttonFull}`}>
        <SVGIcon icon='faUserAstronaut' isFixed />
        <span>My Posts</span>
      </button>
    </Link>
  )

  const contentLogoutButton = () => (
    <button
      onClick={setIsSignedUpWithToast}
      type='button'
      className={`${style.popoverBodyButton} ${style.popoverBodyButtonDark}`}
    >
      <SVGIcon icon='faSignOutAlt' isFixed />
      Logout
    </button>
  )

  const content = () => (
    <>
      {isSignedUp && contentHeader()}
      <div className={`${style.sidebarBody}`}>
        {isSignedUp && contentAccountButton()}
        {isSignedUp && isSmallerThanMD && contentMyPostsButton()}
        {!isSignedUp && nodeIsUpAndRunning(contract) && contentSignupButton()}
        {!isSignedUp && nodeIsUpAndRunning(contract) && contentRecoverButton()}
        {contentNodeSettingsButton()}
        {isSmallerThanMD && contentDarkmodeToggleButton()}
        {isSignedUp && contentLogoutButton()}
      </div>
      {/* {
        isSmallerThanMD && <TrendingHashtags classNames={`${style.tagListCol} max-w-[200px] pr-5`} />}
      */}
      {isSmallerThanMD && (
        <div className={`${style.sidebarFooter}`}>
          <SocialIcons classNames={style.popoverSocialButtonWrapper} />
        </div>
      )}
    </>
  )

  return useScreenSizeQuery('isLargerThanXS') ? (
    <BasePopover
      open
      popoverButton={<div className={style.popoverRef} />}
      popoverPanel={<div className={`${style.popoverWrapper} ${style.popoverWrapperDark}`}>{content()}</div>}
    />
  ) : (
    ReactDOM.createPortal(
      <div className={`${style.sidebarWrapper} ${style.sidebarWrapperDark} ${style.sidebarWrapperPseudo}`}>
        {content()}
      </div>,
      document.body
    )
  )
}

export default UserNavigation
