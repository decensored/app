import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createPost } from 'api/feed'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface FormProps {
  spaceId: number
}

const Form: FunctionComponent<FormProps> = ({ spaceId }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { userName, contract } = useStore((state) => ({
    userName: state.userName,
    userId: state.userId,
    contract: state.contract,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    message: string
  }
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    createPost(contract, spaceId, data.message).then(() => {
      // TODO: Push Post into posts array
      setIsLoading(false)
    })
  }

  const buttonClasses = {
    spacings: 'py-2 px-3',
    text: 'font-medium',
    textColor: 'text-white ',
    style: 'rounded cursor-pointer bg-highlight-900 hover:bg-purple-800',
  }

  return (
    <div
      id='input'
      className='container mx-auto max-w-md bg-white dark:bg-gray-900 rounded
      shadow-sm divide-y divide-solid divide-gray-200
      dark:divide-gray-800'
    >
      <form id='postForm' onSubmit={handleSubmit(onSubmit)}>
        <div className='p-4 relative'>
          <textarea
            placeholder={`${userName}, your story starts here`}
            className='form-input bg-transparent rounded w-full border-none
          outline-none p-0 h-20 resize-none'
            {...register('message', { required: true })}
          />
          <div
            id='message-count'
            className='absolute right-4 bottom-4 py-1 px-2 text-xs text-gray-400
          rounded-full bg-white dark:bg-black
          empty:hidden font-mono leading-none'
          />
        </div>
      </form>
      <div
        id='spread-bar'
        className='p-5 flex justify-between items-center gap-x-2'
      >
        <div>
          <img
            src='/logo/logotype.svg'
            alt='Decensored Logo'
            className='max-h-[20px]'
          />
        </div>
        <div>
          <button
            type='submit'
            form='postForm'
            className={`${classNamesLib.button} ${classNamesLib.buttonDecensored}`}
          >
            <span className='whitespace-nowrap'>
              Spread it{' '}
              {isLoading && (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className='ml-2 animate-spin'
                />
              )}
            </span>
          </button>
          <button
            type='button'
            id='to-top'
            className={`
            hidden
            ${buttonClasses.spacings}
            ${buttonClasses.text}
            ${buttonClasses.textColor}
            ${buttonClasses.style}
        `}
          >
            Back to top
          </button>
        </div>
      </div>
    </div>
  )
}

export default Form
