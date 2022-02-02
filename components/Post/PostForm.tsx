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
  isTransparent?: boolean
  onSpread?: () => void
}

const Form: FunctionComponent<FormProps> = ({ spaceId, motherPost, isTransparent = false, onSpread }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { userName, contract } = useStore((state) => ({
    userName: state.userName,
    contract: state.contract,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    message: string
  }

  const { register, setValue, handleSubmit } = useForm<FormValues>()

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

    if (onSpread) onSpread()
  }

  return (
    <>
      <form id={`postForm-${motherPost}`} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.postFormTextareaWrapper}>
          <TextareaAutosize
            autoFocus
            minRows={2}
            maxLength={280}
            placeholder={`${userName}, spread your opinion!`}
            className={`
              ${style.form}
              ${style.input}
              ${style.inputPlaceholder}
              ${style.inputPlaceholderDark}
              ${!isTransparent && style.inputDefault}
              ${!isTransparent && style.inputDefaultDark}
              ${isTransparent && style.inputTransparent}
              ${isTransparent && style.inputTransparentDark}
            `}
            {...register('message', { required: true })}
          />
          <div className={`${style.postFormMessageCounter} ${style.postFormMessageCounterDark}`} />
        </div>
      </form>
      <div className={style.postFormFooter}>
        <div className={style.postFormFooterLogoWrapper}>
          <img src='/logo/logotype.svg' alt='Decensored Logo' className='max-h-[20px]' />
        </div>
        <div>
          <button type='submit' form={`postForm-${motherPost}`} className={`${style.button} ${style.buttonDecensored}`}>
            <span className='whitespace-nowrap'>
              Spread it {isLoading && <SVGIcon icon='faSpinner' className='ml-2 animate-spin' />}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default Form
