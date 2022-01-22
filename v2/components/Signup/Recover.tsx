import React, { FunctionComponent } from 'react'
import useStore from '../../lib/store'
import { classNamesLib } from '../ClassNames/Lib'

interface RecoverProps {
  // type: string
  handleClick: React.MouseEventHandler<HTMLSpanElement> | undefined
}
const Recover: FunctionComponent<RecoverProps> = () => {
  const { /* isSignedUp, */ setIsSignedUp } = useStore((state) => ({
    // isSignedUp: state.isSignedUp,
    setIsSignedUp: state.setIsSignedUp,
  }))

  return (
    <div className='mt-2 min-h-[42px]'>
      <div className='flex gap-3'>
        <div className='grow shrink'>
          <input
            className={classNamesLib.input}
            type='text'
            placeholder='Paste in your key'
          />
        </div>
        <button
          type='button'
          onClick={() => setIsSignedUp(true)}
          className={`
            ${classNamesLib.button}
            ${classNamesLib.buttonDecensored}
          `}
        >
          Recover
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
          Sign up with account
        </span>
      </p> */}
    </div>
  )
}

export default Recover
