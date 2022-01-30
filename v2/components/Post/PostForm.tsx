import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import { SubmitHandler, useForm } from 'react-hook-form'
import { createPost, createReply } from 'api/feed'
import SVGIcon from 'components/Icon/SVGIcon'
import TextareaAutosize from 'react-textarea-autosize'
// import { dequeuePostsAndSpaces } from 'lib/storeUtils'
// import { poll } from 'lib/polling/polling_posts'

interface FormProps {
  spaceId: number
  motherPost?: number
}

const Form: FunctionComponent<FormProps> = ({ spaceId, motherPost }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { userName, contract } = useStore((state) => ({
    userName: state.userName,
    contract: state.contract,
  }))

  console.log(motherPost)

  // HANDLE FORM SUBMIT
  type FormValues = {
    message: string
  }

  const { register, setValue, handleSubmit } = useForm<FormValues>()

  // Send post on CMD + Enter
  /*   React.useEffect(() => {
    const listener = (event: { code: string; metaKey: any }) => {
      if (event.code === 'Enter' && event.metaKey) {
        alert('Enter key was pressed. Run your function.')
        onSubmit
      }
    }
    document.addEventListener('keydown', listener)
    return () => {
      document.removeEventListener('keydown', listener)
    }
  }, []) */

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { message } = data

    setValue('message', '') // clear out entry field
    setIsLoading(true)

    if (motherPost === 0 || !motherPost) {
      createPost(contract, spaceId, message).then(() => {
        // TODO: Push Post into posts array which will be earmarked and deleted once a message by me gets polled
        // poll() // XXX don't do this because we don't know when the message is available afteer createPost
        setTimeout(() => {
          // dequeuePostsAndSpaces() // XXX this will become automatic during polling when a meesage by me arrives
          setIsLoading(false) // XXX we could detect 'loading' as long as an earmarked message exists
        }, 2 * 1000)
      })
    } else {
      await createReply(contract, motherPost, message)
      setIsLoading(false)
    }
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
      className={`${style.feedItemWrapper} ${style.feedItemWrapperDark}`}
    >
      <div className={style.feedItemInnerTop}>
        <form id='postForm' onSubmit={handleSubmit(onSubmit)}>
          <div className='relative'>
            <TextareaAutosize
              minRows={3}
              maxLength={280}
              placeholder={`${userName}, your story starts here...`}
              className={`
                ${style.form}
                ${style.formTransparent}
                ${style.formPlaceholder}
                ${style.formPlaceholderDark}
              `}
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
      </div>
      <div id='spread-bar' className={style.feedItemInnerBottom}>
        <div className='flex items-center mr-5'>
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
            className={`${style.button} ${style.buttonDecensored}`}
          >
            <span className='whitespace-nowrap'>
              Spread it{' '}
              {isLoading && (
                <SVGIcon icon='faSpinner' className='ml-2 animate-spin' />
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
