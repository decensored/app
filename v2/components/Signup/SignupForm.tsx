import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import Register from './Register'
import Recover from './Recover'
import logo from '../../public/logo/logotype_invert.svg'

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
    <div id='screen_sign_up'>
      <div
        id='screen_signup_inner'
        className='container mx-auto px-3 pb-4 max-w-md'
      >
        <Image src={logo} alt='Signet' className='h-full' />
        <div className='mt-2 min-h-[42px]'>
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
