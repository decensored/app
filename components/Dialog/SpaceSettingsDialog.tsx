import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import BaseDialog from 'components/Dialog/BaseDialog'
import { removeUserFromBlacklist, setSpaceDescription } from 'api/spaces'
import { toast } from 'react-toastify'
import Icon from 'components/Icons/Icon'
import Tag from 'components/Tags/Tag'
import TextareaAutosize from 'react-textarea-autosize'
import { SubmitHandler, useForm } from 'react-hook-form'

interface SpaceSettingsDialogProbs {
  spaceId: number
  name: string
  description: string
  blacklistedUsers: any
  setBlacklist: any
  showDialog: boolean
  onClose: () => void
}

const SpaceSettingsDialog: FunctionComponent<SpaceSettingsDialogProbs> = ({
  spaceId,
  name,
  description,
  blacklistedUsers,
  setBlacklist,
  showDialog,
  onClose,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { contract } = useStore((state) => ({
    contract: state.contract,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    description: string
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    const newDescription = data.description
    console.log(newDescription)
    if (newDescription !== description) {
      const result = await setSpaceDescription(contract, spaceId, newDescription)
      if (result.success) {
        setIsLoading(false)
        onClose()
      } else {
        setIsLoading(false)
        setError('description', { type: 'manual', message: `${result.error}` }, { shouldFocus: true })
      }
    }
  }

  // Remove user from blacklist on SC and change array
  const setRemoveUserFromBlacklist = async (userId: number): Promise<void> => {
    const result = await removeUserFromBlacklist(contract, spaceId, userId)
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
        <Icon icon='faTimes' className='ml-2 text-red-500' />
      </button>
    </Tag>
  ))

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Space Settings'
      body={
        <form id='spaceSettingsForm' onSubmit={handleSubmit(onSubmit)}>
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
            <TextareaAutosize
              minRows={2}
              maxLength={280}
              defaultValue={description}
              className={`
              ${style.form}
              ${style.input}
              ${style.inputDefault}
              ${style.inputDefaultDark}
              ${style.inputFocus}
              ${style.inputPlaceholder}
              ${style.inputPlaceholderDark}
          `}
              {...register('description', { required: true })}
            />
            {errors.description && (
              <div className={`${style.formValidation} ${style.formValidationError}`}>
                <span className={`${style.formValidationText} ${style.formValidationTextError}`}>
                  {errors.description?.type === 'required' && 'Please fill out the description'}
                </span>
              </div>
            )}
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
          >
            <span className='whitespace-nowrap'>
              Save {isLoading && <Icon icon='faSpinner' className='ml-2 animate-spin' />}
            </span>
          </button>
        </>
      }
    />
  )
}

export default SpaceSettingsDialog
