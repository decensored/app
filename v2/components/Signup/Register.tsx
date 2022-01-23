import React, { FunctionComponent } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { signUpUser } from 'api/user'

interface RegisterProps {
  handleClick: React.MouseEventHandler<HTMLSpanElement> | undefined
}

const Register: FunctionComponent<RegisterProps> = () => {
  const { setIsSignedUp, userName, setUserName, contract } = useStore(
    (state) => ({
      isSignedUp: state.isSignedUp,
      setIsSignedUp: state.setIsSignedUp,
      userName: state.userName,
      setUserName: state.setUserName,
      contract: state.contract,
    })
  )

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
    signUpUser(contract, data.username).then(() => {
      setIsSignedUp(true)
      setUserName(data.username)
    })
  }

  return (
    <section>
      <form id='registerForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-3'>
          <div className='grow shrink'>
            <input
              className={classNamesLib.input}
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
            {errors.username && (
              <span className='text-red-500 text-sm'>
                min:4 max:16 only:AZaz
              </span>
            )}
          </div>
          <button
            type='submit'
            form='registerForm'
            className={`
            ${classNamesLib.button}
            ${classNamesLib.buttonDecensoredHeader}
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
