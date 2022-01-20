import React from 'react'
import useStore from '../../lib/store.js'

const Register = (props: {
  type: string
  handleClick: React.MouseEventHandler<HTMLSpanElement> | undefined
}) => {
  const { isSignedUp, setSignUpState } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setSignUpState: state.setSignUpState,
  }))

  return (
    <section>
      <div className='flex gap-3'>
        <div className='grow shrink'>
          <input
            className='form-input p-3 rounded w-full'
            type='text'
            placeholder='Choose your username'
            id='username'
          ></input>
        </div>
        <button
          onClick={setSignUpState}
          className='bg-purple-500 hover:bg-purple-700 text-white font-bold px-4 rounded whitespace-nowrap'
        >
          Sign-up
        </button>
      </div>
      <p className='text-center text-white text-sm decoration-white-8 py-3 underline hover:no-underline cursor-pointer'>
        <span onClick={props.handleClick}>Recover your account</span>
      </p>
    </section>
  )
}

export default Register
