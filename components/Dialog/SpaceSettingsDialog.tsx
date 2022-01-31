import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import BaseDialog from 'components/Dialog/BaseDialog'
import { removeUserFromBlacklist } from 'api/spaces'
import { toast } from 'react-toastify'
import SVGIcon from 'components/Icon/SVGIcon'

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
  const { contract } =
    useStore((state) => ({
      contract: state.contract,
    }))

  // Remove user from blacklist on SC and change array
  const setRemoveUserFromBlacklist = async (userId: number): Promise<void> => {
    const result = await removeUserFromBlacklist(contract, space, userId)
    if (result.success) {
      toast.success(`User has access again!`, {
        autoClose: 3000,
      })
      const newBlackList = blacklistedUsers.filter(
        (user: any) => user.userId !== userId
      )
      setBlacklist(newBlackList)
    } else {
      toast.error(`${result.error}`, {
        autoClose: 3000,
      })
    }
  }

  // Create objects for blacklisted users
  const usersOnBlacklist = blacklistedUsers.map((user: any) => (
    <div className={`${style.blackListTagWrapper} group`}>
      <span className={`${style.blackListItem}`}>{user.username}</span>
      <SVGIcon
        icon='faTimes'
        className='cursor-pointer text-l text-red-500 hidden group-hover:block'
        onClick={() => {
          setRemoveUserFromBlacklist(user.userId)
        }}
      />
    </div>
  ))

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Space Settings'
      body={
        <form id='spaceSettingsForm'>
          <div className='grid grid-cols-3 gap-x-4 gap-y-8'>
            <div className='col-span-3'>
              <span
                className={`
                  ${style.dialogLabel}
                  ${style.dialogLabelDark}
                `}
              >
                Name
              </span>
              <div className={style.inputWrapper}>
                <input
                  className={`
                    ${style.input}
                    ${style.inputDark}
                    ${style.inputFocus}
                  `}
                  type='text'
                  disabled
                  defaultValue={name}
                />
              </div>
            </div>
            <div className='col-span-3'>
              <span
                className={`
                  ${style.dialogLabel}
                  ${style.dialogLabelDark}
                `}
              >
                Blacklisted User{' '}
                {usersOnBlacklist.length > 0 && `(${usersOnBlacklist.length})`}
              </span>
              <div className={style.inputWrapper}>
                <div className='my-2'>
                  <div className='flex flex-wrap gap-x-2 gap-y-2'>
                    {usersOnBlacklist.length > 0 && usersOnBlacklist}
                    {usersOnBlacklist.length === 0 && (
                      <p>No users on the blacklist</p>
                    )}
                  </div>
                </div>
              </div>
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
              basis-full
            `}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            type='submit'
            form='spaceSettingsForm'
            className={`${style.button} ${style.buttonDecensored} basis-full`}
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
