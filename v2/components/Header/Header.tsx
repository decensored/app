import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
// import { toast } from 'react-toastify'
import { faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SignupForm from 'components/Signup/SignupForm'
import SettingsDialog from 'components/Dialog/SettingsDialog'
import UserPopover from 'components/Header/UserPopover'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const Header: FunctionComponent = () => {
  const [isSignedUp] = useStore((state) => [state.isSignedUp], shallow)

  // const setIsSignedUpWithToast = (): void => {
  //   setIsSignedUp(false)
  //   // https://fkhadra.github.io/react-toastify/introduction/
  //   toast.warning(isSignedUp ? 'Signing out...' : 'Signing in...', {})
  // }

  return (
    <div className={classNamesLib.headerWrapper}>
      <SettingsDialog />

      <div className={classNamesLib.headerInner}>
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

        <div id='header_nav_items' className='flex items-center'>
          <Link href='https://github.com/decensored/app' passHref>
            <a
              href='dummy-href'
              target='_blank'
              title='github'
              rel='noreferrer'
              className='text-white text-lg'
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </Link>

          <span className='mx-2 text-white'>|</span>

          <Link href='https://t.co/Lmou3Qx5Ap' passHref>
            <a
              href='dummy-href'
              target='_blank'
              title='discord'
              rel='noreferrer'
              className='text-white text-lg'
            >
              <FontAwesomeIcon icon={faDiscord} />
            </a>
          </Link>

          {/*           <FontAwesomeIcon
            icon={faCog}
            onClick={() => setIsOpenSettingsDialog(true)}
            className='text-white text-lg cursor-pointer ml-5'
          /> */}

          <UserPopover />
        </div>
      </div>

      {!isSignedUp && <SignupForm type='signup' />}
    </div>
  )
}

export default Header
