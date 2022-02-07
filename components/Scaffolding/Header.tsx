import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import SVGIcon from 'components/Icon/SVGIcon'
import Sidebar from 'components/Scaffolding/Profile'
import { Transition } from '@headlessui/react'
// import QueueControl from 'components/QueueControl/QueueControl'
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator'
import SettingsDialog from 'components/Dialog/SettingsDialog'
import { style } from 'styles/style'
import useTimeout from 'hooks/useTimeout.js'
import Link from 'next/link'

const GRACEPERIOD = 1000 // time until showing an error message

const Header: FunctionComponent = () => {
  const [contract] = useStore((state) => [state.contract], shallow)
  const [isSignedUp] = useStore((state) => [state.isSignedUp], shallow)
  const [isOpenProfile, setIsOpenProfile] = useState(false)
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false)

  const [gracePeriodDone, setGracePeriodDone] = useState(false)
  useTimeout(() => setGracePeriodDone(true), GRACEPERIOD)

  const router = useRouter()
  const { pathname } = router
  const isRoot = pathname === '/'

  return (
    <div className={style.headerWrapper}>
      <div className={style.headerLogo}>
        <div className={style.headerBack}>
          {!isRoot && (
            <button type='button' onClick={() => router.back()}>
              <SVGIcon icon='faArrowLeft' />
            </button>
          )}
          {isRoot && <img alt='Decensored Logo' src='/logo/signet.svg' />}
        </div>
        <Link href='/' passHref>
          <img alt='Decensored Logo' src='/logo/logotype_invert.svg' className='h-[20px] cursor-pointer' />
        </Link>
      </div>
      <div id='header_nav_items' className='flex items-center'>
        {nodeIsUpAndRunning(contract) && (
          <>
            <button type='button' onClick={() => setIsOpenProfile(() => !isOpenProfile)}>
              <span className='ml-5 cursor-pointer text-lg text-white'>
                {isSignedUp && <SVGIcon icon='faUser' />}
                {!isSignedUp && <SVGIcon icon='faUserPlus' />}
              </span>
            </button>
            <Transition
              show={isOpenProfile}
              enter='transition-opacity duration-75'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity duration-150'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Sidebar />
            </Transition>
            {isOpenProfile && (
              <div className={style.clickOverlay} onClick={() => setIsOpenProfile(() => !isOpenProfile)} />
            )}
          </>
        )}

        {!nodeIsUpAndRunning(contract) && gracePeriodDone && (
          <>
            <button type='button' onClick={() => setOpenSettingsDialog(true)}>
              <SVGIcon icon='faExclamationTriangle' className='animate-pulse text-red-500' />
            </button>
            <SettingsDialog showDialog={openSettingsDialog} onClose={() => setOpenSettingsDialog(false)} />
          </>
        )}
      </div>
      <LoadingIndicator />
    </div>
  )
}

export default Header
