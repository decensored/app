import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
// import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import UserPopover from 'components/Popover/UserPopover'
import SettingsPopover from 'components/Popover/SettingsPopover'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const Header: FunctionComponent = () => {
  const [setIsOpenSettingsDialog, nodeActive] = useStore(
    (state) => [state.setIsOpenSettingsDialog, state.nodeActive],
    shallow
  )

  const [contract] = useStore(
    (state) => [state.contract],
    shallow
  )

  // const setIsSignedUpWithToast = (): void => {
  //   setIsSignedUp(false)
  //   // https://fkhadra.github.io/react-toastify/introduction/
  //   toast.warning(isSignedUp ? 'Signing out...' : 'Signing in...', {})
  // }

  return (
    <div className={classNamesLib.headerWrapper}>
      {!nodeActive && (
        <button
          type='button'
          onClick={() => {
            setIsOpenSettingsDialog(true)
          }}
          className='absolute right-4 -bottom-5 translate-y-full'
        >
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className='animate-pulse text-red-500'
          />
        </button>
      )}

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
                className='h-[20px]'
              />
            </div>
          </Link>
        </div>
        <div id='header_nav_items' className='flex items-center'>
          {/* <Link href='https://github.com/decensored/app' passHref>
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
          </Link> */}

          {(contract as any).accounts && (
            <UserPopover />
          )}
          <SettingsPopover />
        </div>
      </div>
    </div>
  )
}

export default Header
