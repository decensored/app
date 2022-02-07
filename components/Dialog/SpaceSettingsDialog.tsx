import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import BaseDialog from 'components/Dialog/BaseDialog'
import { removeUserFromBlacklist } from 'api/spaces'
import { toast } from 'react-toastify'
import SVGIcon from 'components/Icon/SVGIcon'
import Tag from 'components/Tags/Tag'

interface SpaceSettingsDialogProbs {
  space: number
  name: string
  blacklistedUsers: any
  setBlacklist: any
  showDialog: boolean
  onClose: () => void
}

const SpaceSettingsDialog: FunctionComponent<SpaceSettingsDialogProbs> = ({
  space,
  name,
  blacklistedUsers,
  setBlacklist,
  showDialog,
  onClose,
}) => {
  const { contract } = useStore((state) => ({
    contract: state.contract,
  }))

  // Remove user from blacklist on SC and change array
  const setRemoveUserFromBlacklist = async (userId: number): Promise<void> => {
    const result = await removeUserFromBlacklist(contract, space, userId)
    if (result.success) {
      toast.success(`User has access again!`, {
        autoClose: 3000,
      })
      const newBlackList = blacklistedUsers.filter((user: any) => user.userId !== userId)
      setBlacklist(newBlackList)
    } else {
      toast.error(`${result.error}`, {
        autoClose: 3000,
      })
    }
  }

  // Create objects for blacklisted users
  const usersOnBlacklist = blacklistedUsers.map((user: any) => (
    <Tag>
      {user.username}
      <button
        type='button'
        onClick={() => {
          setRemoveUserFromBlacklist(user.userId)
        }}
      >
        <SVGIcon icon='faTimes' className='ml-2 text-red-500' />
      </button>
    </Tag>
  ))

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Space Settings'
      body={
        <form id='spaceSettingsForm'>
          <div className={style.inputWrapper}>
            <span
              className={`
                ${style.inputLabel}
                ${style.inputLabelDark}
              `}
            >
              Name
            </span>
            <input
              className={`
                ${style.input}
                ${style.inputDefault}
                ${style.inputDefaultDark}
                ${style.inputFocus}
              `}
              type='text'
              disabled
              defaultValue={name}
            />
          </div>
          <div className={style.inputWrapper}>
            <span
              className={`
                ${style.inputLabel}
                ${style.inputLabelDark}
              `}
            >
              Blacklisted User {usersOnBlacklist.length > 0 && `(${usersOnBlacklist.length})`}
            </span>
            <div className={style.tagListRow}>
              {usersOnBlacklist.length > 0 && usersOnBlacklist}
              {usersOnBlacklist.length === 0 && <p>No users on the blacklist</p>}
            </div>
          </div>
        </form>
      }
      footer={
        <>
          <button
            type='button'
            className={`
              ${style.button}
              ${style.buttonTransparent}
              ${style.buttonTransparentDark}
              ${style.buttonFull}
            `}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            type='submit'
            form='spaceSettingsForm'
            className={`
              ${style.button}
              ${style.buttonDecensored}
              ${style.buttonFull}
            `}
            onClick={() => onClose()}
          >
            Save
          </button>
        </>
      }
    />
  )
}

export default SpaceSettingsDialog
