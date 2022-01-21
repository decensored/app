import React, { FunctionComponent } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useStore from '../../lib/store'

interface RegisterProps {
  // type: string
  handleClick: React.MouseEventHandler<HTMLSpanElement> | undefined
}

const Register: FunctionComponent<RegisterProps> = ({
  /* type, */ handleClick,
}) => {
  const { isSignedUp, toggleIsSignedUp, userName, setUserName, contract } =
    useStore((state) => ({
      isSignedUp: state.isSignedUp,
      toggleIsSignedUp: state.toggleIsSignedUp,

      userName: state.userName,
      setUserName: state.setUserName,

      contract: state.contract,
    }))
  // console.log('contract', contract)

  const toggleIsSignedUpWithToast = (): void => {
    toggleIsSignedUp()

    // https://fkhadra.github.io/react-toastify/introduction/
    toast(isSignedUp ? 'Signing out...' : 'Signing in...')
  }

  return (
    <section>
      <div className='flex gap-3'>
        <div className='grow shrink'>
          <input
            className='form-input p-3 rounded w-full'
            type='text'
            placeholder='Choose your username'
            id='username'
            value={userName}
            onChange={async (e) => {
              const { value } = e.target
              setUserName(value)

              const id = await contract.accounts.methods
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
          onClick={toggleIsSignedUpWithToast}
          className='bg-purple-500 hover:bg-purple-700 text-white
          font-bold px-4 rounded whitespace-nowrap'
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
