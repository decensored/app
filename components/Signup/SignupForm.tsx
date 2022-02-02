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
    <div id='screen_sign_up' className='mt-5 mb-10 w-full'>
      <div id='screen_signup_inner' className='container mx-auto max-w-md px-3'>
        <div className='mb-6 flex justify-center'>
          <img src='/logo/logotype_invert.svg' alt='Decensored Logo' className='max-h-[40px] max-w-[90%]' />
        </div>
        <div className='min-h-[40px]'>
          {theType === 'signup' && <Register /* type={theType} */ handleClick={toggleForm} />}
          {theType === 'recover' && <Recover /* type={theType} */ handleClick={toggleForm} />}
        </div>
      </div>
    </div>
  )
}

export default SignupForm
