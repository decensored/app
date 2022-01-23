import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import 'react-toastify/dist/ReactToastify.css'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpUser } from 'api/user'

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
    await signUpUser(contract, data.username)
    setIsSignedUp(true)
    setUserName(data.username)
    setIsOpenSignupDialog(false)
  }

  return (
    <Dialog
      open={isOpenSignupDialog}
      onClose={() => setIsOpenSignupDialog(false)}
    >
      <div className={classNamesLib.dialogWrapper}>
        <Dialog.Overlay className={classNamesLib.dialogOverlay} />
        <div
          className={`
            ${classNamesLib.dialogInner}
            ${classNamesLib.dialogInnerDark}
          `}
        >
          <div
            className={`
              ${classNamesLib.dialogHeader}
              ${classNamesLib.dialogHeaderDark}
            `}
          >
            Signup
          </div>
          <div className={classNamesLib.dialogBody}>
            <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
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
                <span className='text-red-500 text-sm'>
                  min:4 max:16 only:AZaz
                </span>
              )}
            </form>
          </div>
          <div className={classNamesLib.dialogFooter}>
            <button
              type='button'
              className={`
                ${classNamesLib.button}
                ${classNamesLib.buttonTransparent}
                ${classNamesLib.buttonTransparentDark}
                basis-full
              `}
              onClick={() => setIsOpenSignupDialog(false)}
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
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default SignupDialog
