import React, { FunctionComponent } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpUser } from 'api/user'
import BaseDialog from 'components/Dialog/BaseDialog'

const SignupDialog: FunctionComponent = () => {
  const { isOpenSignupDialog, setIsOpenSignupDialog } = useStore((state) => ({
    isOpenSignupDialog: state.isOpenSignupDialog,
    setIsOpenSignupDialog: state.setIsOpenSignupDialog,
  }))

  const { setIsSignedUp, userName, setUserName, contract } = useStore(
    (state) => ({
      isSignedUp: state.isSignedUp,
      setIsSignedUp: state.setIsSignedUp,
      userName: state.userName,
      setUserName: state.setUserName,
      contract: state.contract,
    })
  )

  // HANDLE FORM SUBMIT
  type FormValues = {
    username: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signUpUser(contract, data.username)
    console.log(JSON.stringify(result, null, 2))

    setIsSignedUp(true)
    setUserName(data.username)
    setIsOpenSignupDialog(false)
  }

  const handleClose = (): void => {
    setIsOpenSignupDialog(false)
  }

  return (
    <BaseDialog
      showDialog={isOpenSignupDialog}
      onClose={handleClose}
      header='Signup'
      body={
        <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
          <div className={classNamesLib.inputWrapper}>
            <input
              className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
              type='text'
              placeholder='Choose your username'
              defaultValue={userName}
              {...register('username', {
                required: true,
                pattern: /^[A-Za-z]+$/i,
                min: 4,
                max: 16,
              })}
            />
            {errors.username && (
              <div
                className={`${classNamesLib.formValidation} ${classNamesLib.formValidationError}`}
              >
                <span
                  className={`${classNamesLib.formValidationText} ${classNamesLib.formValidationTextError}`}
                >
                  min:4 max:16 only:AZaz
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
            form='registerForm'
            className={`${classNamesLib.button} ${classNamesLib.buttonDecensored} basis-full`}
          >
            Sign-up
          </button>
        </>
      }
    />
  )
}

export default SignupDialog
