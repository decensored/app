import React, { FunctionComponent } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { createPopper } from '@popperjs/core'
import { classNamesLib } from '../ClassNames/ClassNames'

const UserPopover: FunctionComponent = () => {
  const [popoverShow, setPopoverShow] = React.useState(false)
  const btnRef = React.createRef()
  const popoverRef = React.createRef()
  const openPopover = (): void => {
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
  return (
    <>
      <button
        type='button'
        onClick={() => {
          // eslint-disable-next-line no-unused-expressions
          popoverShow ? closePopover() : openPopover()
        }}
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
          <div className={`${classNamesLib.popoverHeaderName}`}>
            SonOfCrypto
          </div>
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
