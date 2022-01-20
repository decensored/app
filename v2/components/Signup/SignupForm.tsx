import React from 'react'
import Image from 'next/image'
import Register from './Register'
import Recover from './Recover'
import logo from '../../public/logo/logotype_invert.svg'

export default function SignupForm(props: { type: string }) {
  const [type, setType] = React.useState(props.type)

  function toggleForm() {
    if (type === 'recover') {
      setType('signup')
    } else {
      setType('recover')
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
          {type === 'signup' && (
            <Register type={type} handleClick={toggleForm} />
          )}
          {type === 'recover' && (
            <Recover type={type} handleClick={toggleForm} />
          )}
        </div>
      </div>
    </div>
  )
}
