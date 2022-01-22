import React, { FunctionComponent } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useStore from '../../lib/store'
import { classNamesLib } from '../ClassNames/Lib'

interface RegisterProps {
  // type: string
  handleClick: React.MouseEventHandler<HTMLSpanElement> | undefined
}

const Register: FunctionComponent<RegisterProps> = ({
  /* type, */ handleClick,
}) => {
  const { isSignedUp, setIsSignedUp, userName, setUserName, contract } =
    useStore((state) => ({
      isSignedUp: state.isSignedUp,
      setIsSignedUp: state.setIsSignedUp,

      userName: state.userName,
      setUserName: state.setUserName,

      contract: state.contract,
    }))
  // console.log('contract', contract)

  const setIsSignedUpWithToast = (): void => {
    setIsSignedUp(true)

    // https://fkhadra.github.io/react-toastify/introduction/
    toast(isSignedUp ? 'Signing out...' : 'Signing in...')
  }

  return (
    <section>
      <div className='flex gap-3'>
        <div className='grow shrink'>
          <input
            className={classNamesLib.input}
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
        </div>
        <button
          type='button'
          onClick={setIsSignedUpWithToast}
          className={`
            ${classNamesLib.button}
            ${classNamesLib.buttonDecensored}
          `}
        >
          Sign-up
        </button>
      </div>
      {/* <p
        className='text-center text-white text-sm decoration-white-8
      py-3 underline hover:no-underline cursor-pointer'
      >
        <span
          onClick={handleClick}
          // onKeyDown={handleClick}
          role='link'
          tabIndex={0}
        >
          Recover your account
        </span>
      </p> */}
    </section>
  )
}

export default Register
