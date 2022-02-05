import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import SVGIcon from 'components/Icon/SVGIcon'
import UserPopover from 'components/Popover/UserPopover'
// import QueueControl from 'components/QueueControl/QueueControl'
import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator'
import SettingsDialog from 'components/Dialog/SettingsDialog'
import { style } from 'styles/style'
import useTimeout from 'hooks/useTimeout.js'

const GRACEPERIOD = 1000 // time until showing an error message

const Header: FunctionComponent = () => {
  const [contract] = useStore((state) => [state.contract], shallow)

  const [openSettingsDialog, setOpenSettingsDialog] = useState(false)

  const [gracePeriodDone, setGracePeriodDone] = useState(false)
  useTimeout(() => setGracePeriodDone(true), GRACEPERIOD)

  const router = useRouter()
  const { pathname } = router
  let tabIndex = -1
  if (pathname === '/') tabIndex = 0

  // const setIsSignedUpWithToast = (): void => {
  //   setIsSignedUp(false)
  //   // https://fkhadra.github.io/react-toastify/introduction/
  //   toast.warning(isSignedUp ? 'Signing out...' : 'Signing in...', {})
  // }

  return (
    <div className={style.headerWrapper}>
      <div className={style.headerLogo}>
        <div className={style.headerBack}>
          {tabIndex !== 0 && (
            <button type='button' onClick={() => router.back()}>
              <SVGIcon icon='faArrowLeft' />
            </button>
          )}
          {tabIndex === 0 && <img alt='Decensored Logo' src='/logo/signet.svg' />}
        </div>
        <img alt='Decensored Logo' src='/logo/logotype_invert.svg' className='h-[20px]' />
      </div>
      <div id='header_nav_items' className='flex items-center'>
        {nodeIsUpAndRunning(contract) && <UserPopover />}

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
