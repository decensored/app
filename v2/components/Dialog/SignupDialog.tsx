import React, { FunctionComponent } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpUser } from 'api/user'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import BaseDialog from './BaseDialog'

const SignupDialog: FunctionComponent = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    setIsSignedUp,
    userName,
    setUserName,
    contract,
    isOpenSignupDialog,
    setIsOpenSignupDialog,
  } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setIsSignedUp: state.setIsSignedUp,
    userName: state.userName,
    setUserName: state.setUserName,
    contract: state.contract,
    isOpenSignupDialog: state.isOpenSignupDialog,
    setIsOpenSignupDialog: state.setIsOpenSignupDialog,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    username: string
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    const result = await signUpUser(contract, data.username)
    if (result.success === true) {
      setIsSignedUp(true)
      setUserName(data.username)
      setIsOpenSignupDialog(false)
      setIsLoading(false)
    } else {
      setError(
        'username',
        { type: 'manual', message: `${result.error}` },
        { shouldFocus: true }
      )
      setIsLoading(false)
      //  throw new Error(JSON.stringify(result))
    }
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
                  {errors.username?.type === 'required' &&
                    'Cant be empty! chars: azAZ'}
                  {errors.username.message}
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
            <span className='whitespace-nowrap'>
              Sign-up{' '}
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

export default SignupDialog
