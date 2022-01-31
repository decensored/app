import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpUser } from 'api/user'
import SVGIcon from 'components/Icon/SVGIcon'
import BaseDialog from './BaseDialog'

interface SignupDialogProps {
  showDialog: boolean
  onClose: () => void
}

const SignupDialog: FunctionComponent<SignupDialogProps> = ({
  showDialog,
  onClose,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [signUpDone, setSignUpDone] = React.useState(false)
  const { setIsSignedUp, userName, setUserName, setUserId, contract } =
    useStore((state) => ({
      isSignedUp: state.isSignedUp,
      setIsSignedUp: state.setIsSignedUp,
      userName: state.userName,
      setUserName: state.setUserName,
      setUserId: state.setUserId,
      contract: state.contract,
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
      setUserId(result.userId)
      setIsLoading(false)
      setSignUpDone(true)
      /*     onClose() */
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

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Signup'
      body={
        <>
          {!signUpDone && (
            <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
              <div className={style.inputWrapper}>
                <input
                  className={`${style.input} ${style.inputDark}`}
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
                    className={`${style.formValidation} ${style.formValidationError}`}
                  >
                    <span
                      className={`${style.formValidationText} ${style.formValidationTextError}`}
                    >
                      {errors.username?.type === 'required' &&
                        'Cant be empty! chars: azAZ'}
                      {errors.username.message}
                    </span>
                  </div>
                )}
              </div>
            </form>
          )}
          {signUpDone && (
            <div className={style.inputWrapper}>
              <p className='text-l font-semibold'>Congratulation 🎉</p>
              <p className='text-sm pt-2'>
                You successfully signed up on Decensored!
              </p>
              <p className='text-sm pt-2'>
                <b>Important:</b> To login again at a later point or on any
                other device you will need your key!
              </p>
              <input
                className={`${style.input} ${style.inputDark} mt-5 text-xs`}
                type='text'
                defaultValue={localStorage
                  .getItem('account_private_key')
                  ?.toString()}
                disabled
              />
              <p className='text-sm pt-2'>
                Copy your key and store it in a save place!
              </p>
            </div>
          )}
        </>
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
            Close
          </button>

          {!signUpDone && (
            <button
              type='submit'
              form='registerForm'
              className={`${style.button} ${style.buttonDecensored} basis-full`}
            >
              <span className='whitespace-nowrap'>
                Sign-up{' '}
                {isLoading && (
                  <SVGIcon icon='faSpinner' className='ml-2 animate-spin' />
                )}
              </span>
            </button>
          )}
        </>
      }
    />
  )
}

export default SignupDialog
