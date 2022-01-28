import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import BaseDialog from 'components/Dialog/BaseDialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { recoverUser } from 'api/user'

const RecoverDialog: FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  const handleClose = (): void => {
    setIsOpenRecoverDialog(false)
  }

  const {
    setIsSignedUp,
    setUserName,
    setUserId,
    contract,
    isOpenRecoverDialog,
    setIsOpenRecoverDialog,
  } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setIsSignedUp: state.setIsSignedUp,
    userName: state.userName,
    setUserName: state.setUserName,
    setUserId: state.setUserId,
    contract: state.contract,
    isOpenRecoverDialog: state.isOpenRecoverDialog,
    setIsOpenRecoverDialog: state.setIsOpenRecoverDialog,
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
      setUserId(result.userId)
      setIsOpenRecoverDialog(false)
      setIsLoading(false)
    } else {
      setError(
        'privateKey',
        { type: 'manual', message: `${result.error}` },
        { shouldFocus: true }
      )
      setIsLoading(false)
    }
  }

  return (
    <BaseDialog
      showDialog={isOpenRecoverDialog}
      onClose={handleClose}
      header='Recover'
      body={
        <form id='RecoverForm' onSubmit={handleSubmit(onSubmit)}>
          <div className={classNamesLib.inputWrapper}>
            <input
              className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
              type='text'
              placeholder='Enter your key'
              {...register('privateKey', {
                required: true,
                minLength: 66,
                maxLength: 66,
              })}
            />
            {errors.privateKey && (
              <div
                className={`${classNamesLib.formValidation} ${classNamesLib.formValidationError}`}
              >
                <span
                  className={`${classNamesLib.formValidationText} ${classNamesLib.formValidationTextError}`}
                >
                  {errors.privateKey?.type === 'required' &&
                    'Field cant be empty'}
                  {errors.privateKey?.type === 'minLength' &&
                    'Key must have 66 chars and begin with 0x'}
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
                ${classNamesLib.button}
                ${classNamesLib.buttonTransparent}
                ${classNamesLib.buttonTransparentDark}
                basis-full
              `}
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type='submit'
            form='RecoverForm'
            className={`${classNamesLib.button} ${classNamesLib.buttonDecensored} basis-full`}
          >
            <span className='whitespace-nowrap'>
              Recover{' '}
              {isLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className='ml-2 animate-spin'
                />
              )}
            </span>
          </button>
        </>
      }
    />
  )
}

export default RecoverDialog
