import React, { FunctionComponent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useStore from 'lib/store'
import { style } from 'styles/style'
import BaseDialog from 'components/Dialog/BaseDialog'
import { createSpace /* , getSpaceByName */ } from 'api/spaces'
import SVGIcon from 'components/Icon/SVGIcon'
import router from 'next/router'
import TextareaAutosize from 'react-textarea-autosize'

interface CreateSpaceDialogProps {
  showDialog: boolean
  onClose: () => void
}

const CreateSpaceDialog: FunctionComponent<CreateSpaceDialogProps> = ({
  showDialog,
  onClose,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const {
    contract,
    // spaces,
    // setSpaces,
  } = useStore((state) => ({
    contract: state.contract,
    // spaces: state.spaces,
    // setSpaces: state.setSpaces,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    name: string
    description: string
  }
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsLoading(true)
    const result = await createSpace(contract, data.name, data.description)
    if (result.success) {
      // const newSpace = await getSpaceByName(contract, data.name)
      // spaces.push(newSpace)
      // setSpaces(spaces) // let the appending of the new space new done by polling_spaces.ts for now
      setIsLoading(false)
      router.push(`/space/${data.name}`)
      onClose()
    } else {
      setError(
        'name',
        { type: 'manual', message: `${result.error}` },
        { shouldFocus: true }
      )
      setIsLoading(false)
    }
  }

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Create Space'
      body={
        <form id='createSpaceForm' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-3 gap-x-4 gap-y-8'>
            <div className='col-span-3'>
              <span
                className={`
                  ${style.inputLabel}
                  ${style.inputLabelDark}
                `}
              >
                Create Space
              </span>
              <div className={style.inputWrapper}>
                <input
                  className={`
                    ${style.input}
                    ${style.inputDark}
                    ${style.inputFocus}
                  `}
                  type='text'
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <div
                    className={`${style.formValidation} ${style.formValidationError}`}
                  >
                    <span
                      className={`${style.formValidationText} ${style.formValidationTextError}`}
                    >
                      {errors.name?.type === 'required' &&
                        'Cant be empty! chars: azAZ'}
                      {errors.name.message}
                    </span>
                  </div>
                )}
              </div>
              <span
                className={`pt-5
                  ${style.inputLabel}
                  ${style.inputLabelDark}
                `}
              >
                Description
              </span>
              <div className={style.inputWrapper}>
                <TextareaAutosize
                  minRows={3}
                  maxLength={280}
                  placeholder='Your description..'
                  className={`
                  ${style.form}
                  ${style.input}
                  ${style.inputDark}
                  ${style.inputFocus}
                  ${style.inputPlaceholder}
                  ${style.inputPlaceholderDark}
              `}
                  {...register('description', { required: true })}
                />
                {errors.name && (
                  <div
                    className={`${style.formValidation} ${style.formValidationError}`}
                  >
                    <span
                      className={`${style.formValidationText} ${style.formValidationTextError}`}
                    >
                      {errors.name?.type === 'required' &&
                        'Cant be empty! chars: azAZ'}
                      {errors.name.message}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      }
      footer={
        <>
          <button
            type='button'
            className={`
              ${style.button}
              ${style.buttonTransparent}
              ${style.buttonTransparentDark}
              basis-full
            `}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            type='submit'
            form='createSpaceForm'
            className={`${style.button} ${style.buttonDecensored} basis-full`}
          >
            <span className='whitespace-nowrap'>
              Create{' '}
              {isLoading && (
                <SVGIcon icon='faSpinner' className='ml-2 animate-spin' />
              )}
            </span>
          </button>
        </>
      }
    />
  )
}

export default CreateSpaceDialog
