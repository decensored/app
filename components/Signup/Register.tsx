import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpUser } from 'api/user'

interface RegisterProps {
  handleClick: React.MouseEventHandler<HTMLSpanElement> | undefined
}

const Register: FunctionComponent<RegisterProps> = () => {
  const { setIsSignedUp, userName, setUserName, contract } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setIsSignedUp: state.setIsSignedUp,
    userName: state.userName,
    setUserName: state.setUserName,
    contract: state.contract,
  }))

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
    signUpUser(contract, data.username, 'token').then(() => {
      setIsSignedUp(true)
      setUserName(data.username)
    })
  }

  return (
    <section>
      <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-3'>
          <div className='shrink grow'>
            <input
              className={style.input}
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
            {errors.username && <span className='text-sm text-red-500'>min:4 max:16 only:AZaz</span>}
          </div>
          <button
            type='submit'
            form='registerForm'
            className={`
            ${style.button}
            ${style.buttonDecensoredHeader}
          `}
          >
            Sign-up
          </button>
        </div>
      </form>
    </section>
  )
}

export default Register
