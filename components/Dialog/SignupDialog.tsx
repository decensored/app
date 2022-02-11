import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpUser } from 'api/user'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
import SVGIcon from 'components/Icon/SVGIcon'
import BaseDialog from './BaseDialog'

interface SignupDialogProps {
  showDialog: boolean
  onClose: () => void
}

const SignupDialog: FunctionComponent<SignupDialogProps> = ({ showDialog, onClose }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [signUpDone, setSignUpDone] = React.useState(false)
  const { setIsSignedUp, userName, setUserName, setUserId, contract } = useStore((state) => ({
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
    token: string
  }

  const getAccountPrivateKey = (): string => {
    const key = localStorage.account_private_key || 'No key found'
    return key
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    const result = await signUpUser(contract, data.username, data.token)
    if (result.success === true) {
      setIsSignedUp(true)
      setUserName(data.username)
      setUserId(parseInt(result.userId, 10))
      setIsLoading(false)
      setSignUpDone(true)
      /*     onClose() */
    } else {
      setError('token', { type: 'manual', message: `Seems like this token is invalid!` }, { shouldFocus: true })
      setIsLoading(false)
      //  throw new Error(JSON.stringify(result))
    }
  }

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header={`${!signUpDone ? 'Signup' : 'Congratulation 🎉'}`}
      body={
        <>
          {!signUpDone && (
            <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
              <div className={style.inputWrapper}>
                <div className={`${style.alert} ${style.alertDark} mb-5`}>
                  <b className='font-bold'>No invite token?</b> Reach out to us on
                  <a
                    className={`${style.link} mx-1`}
                    href='https://discord.gg/PbyugWCA'
                    rel='noreferrer'
                    target='_blank'
                  >
                    Discord
                  </a>
                  to get one!
                </div>
                <span
                  className={`
                  ${style.inputLabel}
                  ${style.inputLabelDark}
                `}
                >
                  Username
                </span>
                <input
                  className={`
                    ${style.input}
                    ${style.inputDefault}
                    ${style.inputDefaultDark}
                    ${style.inputFocus}
                  `}
                  type='text'
                  placeholder='Choose your username'
                  defaultValue={userName}
                  {...register('username', {
                    required: true,
                    pattern: /^[a-zA-Z0-9]+$/i,
                    minLength: 4,
                    maxLength: 15,
                  })}
                />
                {errors.username && (
                  <div className={`${style.formValidation} ${style.formValidationError} mb-10`}>
                    <span className={`${style.formValidationText} ${style.formValidationTextError}`}>
                      {errors.username?.type === 'required' && 'Choose your username!'}
                      {errors.username?.type === 'pattern' && 'Use only alphabetic chars and numbers!'}
                      {(errors.username?.type === 'minLength' || errors.username?.type === 'maxLength') &&
                        'Username must be between 4-15 chars!'}
                    </span>
                  </div>
                )}
                <span
                  className={`
                    ${style.inputLabel}
                    ${style.inputLabelDark}
                    ${errors.username ? `${style.inputLabelErrorMarginTop}` : `${style.inputLabelMarginTop}`}
                  `}
                >
                  Invite Token
                </span>
                <input
                  className={`
                    ${style.input}
                    ${style.inputDefault}
                    ${style.inputDefaultDark}
                    ${style.inputFocus}
                  `}
                  type='text'
                  placeholder='Paste in your Invite Token'
                  {...register('token', {
                    required: true,
                    min: 4,
                    max: 48,
                  })}
                />
                {errors.token && (
                  <div className={`${style.formValidation} ${style.formValidationError}`}>
                    <span className={`${style.formValidationText} ${style.formValidationTextError}`}>
                      {errors.token?.type === 'required' && 'Please provide your token'}
                      {errors.token.message}
                    </span>
                  </div>
                )}
              </div>
            </form>
          )}
          {signUpDone && (
            <div className={style.inputWrapper}>
              <p>You successfully signed up on Decensored!</p>
              <div className={`${style.alert} ${style.alertDark} my-5`}>
                <b className='font-bold'>Important:</b> To login again at a later point or on any other device you will
                need your key! Copy your key and store it in a save place!
              </div>
              <div className={style.inputGroup}>
                <input
                  className={`
                    ${style.input}
                    ${style.inputDefault}
                    ${style.inputDefaultDark}
                    ${style.inputFocus}
                    rounded-r-none
                  `}
                  type='text'
                  defaultValue={getAccountPrivateKey()}
                  readOnly
                />
                <CopyToClipboard text={getAccountPrivateKey()} onCopy={() => toast(`Key copied to clipboard`)}>
                  <button
                    type='button'
                    className={`
                      ${style.button}
                      ${style.buttonDecensored}
                      rounded-l-none
                    `}
                  >
                    <SVGIcon icon='faClipboard' isFixed />
                  </button>
                </CopyToClipboard>
              </div>
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
              ${style.buttonFull}
            `}
            onClick={() => onClose()}
          >
            Close
          </button>

          {!signUpDone && (
            <button
              type='submit'
              form='registerForm'
              className={`
                ${style.button}
                ${style.buttonDecensored}
                ${style.buttonFull}
              `}
            >
              <span className='whitespace-nowrap'>
                Sign-up {isLoading && <SVGIcon icon='faSpinner' className='ml-2 animate-spin' />}
              </span>
            </button>
          )}
        </>
      }
    />
  )
}

export default SignupDialog
