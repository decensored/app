import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import Icon from 'components/Icons/Icon'
import BaseDialog from 'components/Dialog/BaseDialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { recoverUser } from 'api/user'

interface RecoverDialogProps {
  showDialog: boolean
  onClose: () => void
}

const RecoverDialog: FunctionComponent<RecoverDialogProps> = ({ showDialog, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(false)

  const { setIsSignedUp, setUserName, setUserId, contract } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setIsSignedUp: state.setIsSignedUp,
    userName: state.userName,
    setUserName: state.setUserName,
    setUserId: state.setUserId,
    contract: state.contract,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    privateKey: string
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    const result = await recoverUser(contract, data.privateKey)
    if (result.success) {
      setIsSignedUp(true)
      setUserName(result.username)
      setUserId(parseInt(result.userId, 10))
      setIsLoading(false)
      onClose()
    } else {
      setError('privateKey', { type: 'manual', message: `${result.error}` }, { shouldFocus: true })
      setIsLoading(false)
    }
  }

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Recover'
      body={
        <form id='RecoverForm' onSubmit={handleSubmit(onSubmit)}>
          <div className={style.inputWrapper}>
            <input
              className={`
                ${style.input}
                ${style.inputDefault}
                ${style.inputDefaultDark}
                ${style.inputFocus}
              `}
              type='text'
              placeholder='Paste in your key'
              {...register('privateKey', {
                required: true,
                minLength: 66,
                maxLength: 66,
              })}
            />
            {errors.privateKey && (
              <div className={`${style.formValidation} ${style.formValidationError}`}>
                <span className={`${style.formValidationText} ${style.formValidationTextError}`}>
                  {errors.privateKey?.type === 'required' && 'Field cant be empty'}
                  {errors.privateKey?.type === 'minLength' && 'Key must have 66 chars and begin with 0x'}
                  {errors.privateKey?.message}
                </span>
              </div>
            )}
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
            form='RecoverForm'
            className={`
              ${style.button}
              ${style.buttonDecensored}
              ${style.buttonFull}
            `}
          >
            <span className='whitespace-nowrap'>
              Recover {isLoading && <Icon icon='faSpinner' className='ml-2 animate-spin' />}
            </span>
          </button>
        </>
      }
    />
  )
}

export default RecoverDialog
