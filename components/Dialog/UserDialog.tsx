import React, { FunctionComponent } from 'react'
import BaseDialog from 'components/Dialog/BaseDialog'
import { style } from 'styles/style'
import Link from 'next/link'

interface UserDialogProbs {
  showDialog: boolean
  onClose: () => void
  users: any
}

const UserDialog: FunctionComponent<UserDialogProbs> = ({
  showDialog,
  onClose,
  users,
}) => {
  // Create items for users
  const usersinSpace = users.map((user: any) => (
    <Link key={user.id} href={`/user/${user.username}`} passHref>
      <div className='py-3 px-3 cursor-pointer hover:bg-highlight-40'>
        {user.username}
      </div>
    </Link>
  ))

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Space Users'
      body={
        <form id='spaceSettingsForm'>
          <div className='divide-y divide-double'>{usersinSpace}</div>
        </form>
      }
      footer={
        <button
          type='button'
          className={`
            ${style.button}
            ${style.buttonTransparent}
            ${style.buttonTransparentDark}
            basis-full
          `}
          onClick={() => onClose()}
        >
          Close
        </button>
      }
    />
  )
}

export default UserDialog
