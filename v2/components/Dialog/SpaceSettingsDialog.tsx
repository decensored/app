import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BaseDialog from 'components/Dialog/BaseDialog'
import { removeUserFromBlacklist } from 'api/spaces'
import { toast } from 'react-toastify'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface SpaceSettingsProbs {
  space: number
  name: string
  blacklistedUsers: any
  setBlacklist: any
}

const SpaceSettingsDialog: FunctionComponent<SpaceSettingsProbs> = ({
  space,
  name,
  blacklistedUsers,
  setBlacklist,
}) => {
  const { contract, isOpenSpaceSettingsDialog, setIsOpenSpaceSettingsDialog } =
    useStore((state) => ({
      contract: state.contract,
      isOpenSpaceSettingsDialog: state.isOpenSpaceSettingsDialog,
      setIsOpenSpaceSettingsDialog: state.setIsOpenSpaceSettingsDialog,
    }))

  const handleClose = (): void => {
    setIsOpenSpaceSettingsDialog(false)
  }

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
    <div className={`${classNamesLib.blackListTagWrapper} group`}>
      <span className={`${classNamesLib.blackListItem}`}>{user.username}</span>
      <FontAwesomeIcon
        icon={faTimes}
        className='cursor-pointer text-l text-red-500 hidden group-hover:block'
        onClick={() => {
          setRemoveUserFromBlacklist(user.userId)
        }}
      />
    </div>
  ))

  return (
    <BaseDialog
      showDialog={isOpenSpaceSettingsDialog}
      onClose={handleClose}
      header='Space Settings'
      body={
        <form id='spaceSettingsForm'>
          <div className='grid grid-cols-3 gap-x-4 gap-y-8'>
            <div className='col-span-3'>
              <span
                className={`
                  ${classNamesLib.dialogLabel}
                  ${classNamesLib.dialogLabelDark}
                `}
              >
                Name
              </span>
              <div className={classNamesLib.inputWrapper}>
                <input
                  className={`
                    ${classNamesLib.input}
                    ${classNamesLib.inputDark}
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
                  ${classNamesLib.dialogLabel}
                  ${classNamesLib.dialogLabelDark}
                `}
              >
                Blacklisted User{' '}
                {usersOnBlacklist.length > 0 && `(${usersOnBlacklist.length})`}
              </span>
              <div className={classNamesLib.inputWrapper}>
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
            ${classNamesLib.button}
            ${classNamesLib.buttonTransparent}
            ${classNamesLib.buttonTransparentDark}
            basis-full
          `}
            onClick={() => setIsOpenSpaceSettingsDialog(false)}
          >
            Cancel
          </button>
          <button
            type='submit'
            form='spaceSettingsForm'
            className={`${classNamesLib.button} ${classNamesLib.buttonDecensored} basis-full`}
            onClick={() => setIsOpenSpaceSettingsDialog(false)}
          >
            Save
          </button>
        </>
      }
    />
  )
}

export default SpaceSettingsDialog
