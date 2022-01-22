import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import useStore from 'lib/store'
import { toast } from 'react-toastify'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SignupForm from '../Signup/SignupForm'
import SettingsDialog from '../Dialog/SettingsDialog'
import UserPopover from './UserPopover'

const Header: FunctionComponent = () => {
  const [settingsModalOpen, isOpenSettingsDialog] = React.useState(false)

  const { isSignedUp, setIsSignedUp } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setIsSignedUp: state.setIsSignedUp,
  }))

  const setIsSignedUpWithToast = (): void => {
    setIsSignedUp(false)
    // https://fkhadra.github.io/react-toastify/introduction/
    toast.warning(isSignedUp ? 'Signing out...' : 'Signing in...', {})
  }

  return (
    <div className='bg-decensored-gradient w-full flex flex-col items-start'>
      <SettingsDialog
        isOpen={settingsModalOpen}
        setIsOpen={isOpenSettingsDialog}
      />
      <div className='flex w-full gap-y-5 p-4 justify-between items-center'>
        <div id='logo'>
          <Link href='/' passHref>
            <div className='flex gap-2 items-center'>
              <img
                alt='Decensored Logo'
                src='/logo/signet.svg'
                className='h-[30px] -mt-1'
              />
              <img
                alt='Decensored Logo'
                src='/logo/logotype_invert.svg'
                className='h-[20px] hidden sm:block'
              />
            </div>
          </Link>
        </div>
        <div
          id='header_nav_items'
          className='text-white text-lg flex items-center'
        >
          <Link href='https://github.com/decensored/app' passHref>
            <a
              href='dummy-href'
              target='_blank'
              title='github'
              rel='noreferrer'
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </Link>
          <span className='mx-2'>|</span>
          <Link href='https://t.co/Lmou3Qx5Ap' passHref>
            <a
              href='dummy-href'
              target='_blank'
              title='discord'
              rel='noreferrer'
            >
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </Link>
          <FontAwesomeIcon
            icon={faCog}
            onClick={() => isOpenSettingsDialog(true)}
            className='cursor-pointer ml-5'
          />
          <UserPopover />
          {isSignedUp && (
            <FontAwesomeIcon
              onClick={setIsSignedUpWithToast}
              icon={faSignOutAlt}
              className='cursor-pointer ml-5'
            />
          )}
        </div>
      </div>
      {!isSignedUp && <SignupForm type='signup' />}
    </div>
  )
}

export default Header
