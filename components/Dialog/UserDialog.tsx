import React, { FunctionComponent } from 'react'
import BaseDialog from 'components/Dialog/BaseDialog'
import { style } from 'styles/style'
import Link from 'next/link'
import Tag from 'components/Tags/Tag'

interface UserDialogProbs {
  showDialog: boolean
  onClose: () => void
  users: any
}

const UserDialog: FunctionComponent<UserDialogProbs> = ({ showDialog, onClose, users }) => {
  // Create items for users
  const usersinSpace = users.map((user: any) => (
    <div key={`user-${user.id}`} className={`${style.itemListItem} ${style.itemListItemDark}`}>
      {user.username}
      <Link href={`/user/${user.username}`} passHref>
        <Tag clickable classNames={style.itemListItemHoverElement}>
          <span>
            <span className='hidden sm:inline'>Open </span>Profile
          </span>
        </Tag>
      </Link>
    </div>
  ))

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Space Users'
      body={
        <form id='spaceSettingsForm'>
          <div className={`${style.itemList} ${style.itemListDark}`}>{usersinSpace}</div>
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
