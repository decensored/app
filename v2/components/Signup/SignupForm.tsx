import React, { FunctionComponent } from 'react'
import Register from './Register'
import Recover from './Recover'

interface SignupFormProps {
  type: string
}

const SignupForm: FunctionComponent<SignupFormProps> = ({ type }) => {
  const [theType, setTheType] = React.useState(type)

  const toggleForm = (): void => {
    if (theType === 'recover') {
      setTheType('signup')
    } else {
      setTheType('recover')
    }
  }

  return (
    <div id='screen_sign_up' className='w-full mt-5 mb-10'>
      <div
        id='screen_signup_inner'
        className='container mx-auto px-3 max-w-md'
      >
        <div className='flex justify-center mb-6'>
          <img
            src='/logo/logotype_invert.svg'
            alt='Decensored Logo'
            className='max-h-[42px] max-w-[90%]'
          />
        </div>
        <div className='min-h-[42px]'>
          {theType === 'signup' && (
            <Register /* type={theType} */ handleClick={toggleForm} />
          )}
          {theType === 'recover' && (
            <Recover /* type={theType} */ handleClick={toggleForm} />
          )}
        </div>
      </div>
    </div>
  )
}

export default SignupForm
