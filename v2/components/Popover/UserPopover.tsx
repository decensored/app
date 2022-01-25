import React, { FunctionComponent, useState } from 'react'
import shallow from 'zustand/shallow'
import { toast } from 'react-toastify'
import { Popover } from '@headlessui/react'
import { usePopper } from 'react-popper'
import {
  faPlus,
  faRedoAlt,
  faSignOutAlt,
  faUser,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const UserPopover: FunctionComponent = () => {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  )
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'bottom-end',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 5],
        },
      },
    ],
  })

  const [
    setIsOpenSignupDialog,
    setIsOpenRecoverDialog,
    isSignedUp,
    setIsSignedUp,
    userName,
  ] = useStore(
    (state) => [
      state.setIsOpenSignupDialog,
      state.setIsOpenRecoverDialog,
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
    <Popover>
      <Popover.Button ref={setReferenceElement}>
        <span className='cursor-pointer ml-5 text-white text-lg'>
          {isSignedUp && <FontAwesomeIcon icon={faUser} />}
          {!isSignedUp && <FontAwesomeIcon icon={faUserPlus} />}
        </span>
      </Popover.Button>

      <Popover.Panel
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div
          className={`${classNamesLib.popoverWrapper} ${classNamesLib.popoverWrapperDark}`}
        >
          {isSignedUp && (
            <div className={`${classNamesLib.popoverHeader}`}>
              <div className={`${classNamesLib.popoverHeaderLabel}`}>
                <span>Logged in as</span>
              </div>
              <div className={`${classNamesLib.popoverHeaderName}`}>
                {userName}
              </div>
            </div>
          )}
          <div className={`${classNamesLib.popoverBody}`}>
            {isSignedUp && (
              <button
                type='button'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </button>
            )}
            {!isSignedUp && (
              <>
                <button
                  type='button'
                  onClick={() => {
                    setIsOpenSignupDialog(true)
                  }}
                  className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <span>Sign up</span>
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setIsOpenRecoverDialog(true)
                  }}
                  className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
                >
                  <FontAwesomeIcon icon={faRedoAlt} />
                  <span>Recover account</span>
                </button>
              </>
            )}
            {isSignedUp && (
              <button
                onClick={setIsSignedUpWithToast}
                type='button'
                className={`${classNamesLib.popoverBodyButton} ${classNamesLib.popoverBodyButtonDark}`}
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
                Logout
              </button>
            )}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  )
}

export default UserPopover
