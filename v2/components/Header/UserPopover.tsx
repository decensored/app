import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import { createPopper } from '@popperjs/core'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNamesLib } from '../ClassNames/ClassNames'
import useStore from '../../lib/store'

const UserPopover: FunctionComponent = () => {
  const [popoverShow, setPopoverShow] = React.useState(false)
  const btnRef: React.RefObject<HTMLButtonElement> = React.createRef()
  const popoverRef: React.RefObject<HTMLDivElement> = React.createRef()

  const [userName, setIsSignedUp] = useStore(
    (state) => [state.userName, state.setIsSignedUp],
    shallow
  )

  const openPopover = (): void => {
    if (!btnRef.current || !popoverRef.current) return // let the typechecker know it will not be null

    createPopper(btnRef.current, popoverRef.current, {
      placement: 'bottom-end',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8],
          },
        },
      ],
    })
    setPopoverShow(true)
  }

  const closePopover = (): void => {
    setPopoverShow(false)
  }

  const setIsSignedUpWithToast = (): void => {
    closePopover()
    setIsSignedUp(false)
    // https://fkhadra.github.io/react-toastify/introduction/
    toast('Logging out...')
  }

  return (
    <>
      <button
        type='button'
        onClick={popoverShow ? closePopover : openPopover}
        ref={btnRef}
        className='cursor-pointer ml-5'
      >
        <FontAwesomeIcon icon={faUser} />
      </button>
      <div
        className={`${classNamesLib.popoverWrapper} ${
          popoverShow ? '' : 'hidden '
        }`}
        ref={popoverRef}
      >
        <div className={`${classNamesLib.popoverHeader}`}>
          <div className={`${classNamesLib.popoverHeaderLabel}`}>
            Logged in as
          </div>
          <div className={`${classNamesLib.popoverHeaderName}`}>{userName}</div>
        </div>
        <div className={`${classNamesLib.popoverBody}`}>
          <button
            type='button'
            className={`${classNamesLib.popoverBodyButton}`}
          >
            Profile
          </button>
          <button
            type='button'
            className={`${classNamesLib.popoverBodyButton}`}
          >
            Settings
          </button>
          <button
            onClick={setIsSignedUpWithToast}
            type='button'
            className={`${classNamesLib.popoverBodyButton}`}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  )
}

export default UserPopover
