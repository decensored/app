import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const SignupDialog: FunctionComponent = () => {
  const {
    isOpenSignupDialog,
    setIsOpenSignupDialog,
  } = useStore((state) => ({
    isOpenSignupDialog: state.isOpenSignupDialog,
    setIsOpenSignupDialog: state.setIsOpenSignupDialog,
  }))

  const { isSignedUp, setIsSignedUp, userName, setUserName, contract } =
    useStore((state) => ({
      isSignedUp: state.isSignedUp,
      setIsSignedUp: state.setIsSignedUp,

      userName: state.userName,
      setUserName: state.setUserName,

      contract: state.contract,
    }))

  const setIsSignedUpWithToast = (): void => {
    setIsSignedUp(true)

    // https://fkhadra.github.io/react-toastify/introduction/
    toast(isSignedUp ? 'Signing out...' : 'Signing in...')
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
            <form id='SignupForm'>
              <input
              className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
              type='text'
              placeholder='Choose your username'
              id='username'
              value={userName}
              onChange={async (e) => {
                const { value } = e.target
                setUserName(value)

                // const c = contract as any
                const id = await (contract as any).accounts.methods
                  .id_by_username(value)
                  .call() // TODO: error handling
                if (id !== '0') {
                  toast(`user ${value} has id ${id}`)
                }
              }}
            />
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
              type='button'
              onClick={() => {
                setIsSignedUpWithToast()
                setIsOpenSignupDialog(false)
              }}
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
