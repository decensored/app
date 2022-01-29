import React, { FunctionComponent, useState } from 'react'
import Link from 'next/link'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import SVGIcon from 'components/Icon/SVGIcon'
import UserPopover from 'components/Popover/UserPopover'
// import QueueControl from 'components/QueueControl/QueueControl'
import SettingsPopover from 'components/Popover/SettingsPopover'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import useTimeout from 'hooks/useTimeout.js'

const Header: FunctionComponent = () => {
  const [setIsOpenSettingsDialog, contract] = useStore(
    (state) => [state.setIsOpenSettingsDialog, state.contract],
    shallow
  )

  const [gracePeriodDone, setGracePeriodDone] = useState(false)
  useTimeout(() => setGracePeriodDone(true), 500)

  // const setIsSignedUpWithToast = (): void => {
  //   setIsSignedUp(false)
  //   // https://fkhadra.github.io/react-toastify/introduction/
  //   toast.warning(isSignedUp ? 'Signing out...' : 'Signing in...', {})
  // }

  return (
    <div className={classNamesLib.headerWrapper}>
      {/* <QueueControl /> */}

      {!nodeIsUpAndRunning(contract) && gracePeriodDone && (
        <button
          type='button'
          onClick={() => {
            setIsOpenSettingsDialog(true)
          }}
          className='absolute right-4 -bottom-5 translate-y-full'
        >
          <SVGIcon
            icon='faExclamationTriangle'
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
                className='h-[30px] -mt-1 xs:hidden'
              />
              <img
                alt='Decensored Logo'
                src='/logo/logotype_invert.svg'
                className='h-[20px] hidden xs:block'
              />
            </div>
          </Link>
        </div>
        <div id='header_nav_items' className='flex items-center'>
          {nodeIsUpAndRunning(contract) && <UserPopover />}
          <SettingsPopover />
        </div>
      </div>
    </div>
  )
}

export default Header
