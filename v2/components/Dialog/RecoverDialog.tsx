import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BaseDialog from 'components/Dialog/BaseDialog'
import { SubmitHandler, useForm } from 'react-hook-form'
import { recoverUser } from 'api/user'

const RecoverDialog: FunctionComponent = () => {
  const handleClose = (): void => {
    setIsOpenRecoverDialog(false)
  }

  const {
    setIsSignedUp,
    setUserName,
    contract,
    isOpenRecoverDialog,
    setIsOpenRecoverDialog,
  } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setIsSignedUp: state.setIsSignedUp,
    userName: state.userName,
    setUserName: state.setUserName,
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
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await recoverUser(contract, data.privateKey)
    if (result.success === true) {
      setIsSignedUp(true)
      setUserName(result.username)
      setIsOpenRecoverDialog(false)
    } else {
      throw new Error(JSON.stringify(result))
    }
  }

  return (
    <BaseDialog
      showDialog={isOpenRecoverDialog}
      onClose={handleClose}
      header='Recover'
      body={
        <form id='RecoverForm' onSubmit={handleSubmit(onSubmit)}>
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
                Key must consist of 66 chars and start with 0x
              </span>
            </div>
          )}
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
            Recover
          </button>
        </>
      }
    />
  )
}

export default RecoverDialog
