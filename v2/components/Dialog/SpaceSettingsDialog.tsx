import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BaseDialog from 'components/Dialog/BaseDialog'

interface SpaceSettingsProbs {
  name: string
  blacklistedUsers: any
}

const SpaceSettingsDialog: FunctionComponent<SpaceSettingsProbs> = ({
  name,
  blacklistedUsers,
}) => {
  const { isOpenSpaceSettingsDialog, setIsOpenSpaceSettingsDialog } = useStore(
    (state) => ({
      isOpenSpaceSettingsDialog: state.isOpenSpaceSettingsDialog,
      setIsOpenSpaceSettingsDialog: state.setIsOpenSpaceSettingsDialog,
    })
  )

  const handleClose = (): void => {
    setIsOpenSpaceSettingsDialog(false)
  }

  const users = blacklistedUsers.map((user: any) => (
    <span className='first:mx-0 py-2 px-3 mx-2 rounded-sm bg-gray-200'>
      {user.username}
      <span>x</span>
    </span>
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
                Blacklisted User {users.length > 0 && `(${users.length})`}
              </span>
              <div className={classNamesLib.inputWrapper}>
                {users.length > 0 && users}
                {users.length === 0 && <p>No users on the blacklist</p>}
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
          >
            Save
          </button>
        </>
      }
    />
  )
}

export default SpaceSettingsDialog
