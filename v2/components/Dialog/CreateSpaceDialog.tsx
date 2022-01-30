import React, { FunctionComponent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
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
                  ${classNamesLib.dialogLabel}
                  ${classNamesLib.dialogLabelDark}
                `}
              >
                Create Space
              </span>
              <div className={classNamesLib.inputWrapper}>
                <input
                  className={`
                    ${classNamesLib.input}
                    ${classNamesLib.inputDark}
                  `}
                  type='text'
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <div
                    className={`${classNamesLib.formValidation} ${classNamesLib.formValidationError}`}
                  >
                    <span
                      className={`${classNamesLib.formValidationText} ${classNamesLib.formValidationTextError}`}
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
                  ${classNamesLib.dialogLabel}
                  ${classNamesLib.dialogLabelDark}
                `}
              >
                Description
              </span>
              <div className={classNamesLib.inputWrapper}>
                <TextareaAutosize
                  minRows={3}
                  maxLength={280}
                  placeholder='Your description..'
                  className={`
                  ${classNamesLib.input}
                  ${classNamesLib.inputDark}
              `}
                  {...register('description', { required: true })}
                />
                {errors.name && (
                  <div
                    className={`${classNamesLib.formValidation} ${classNamesLib.formValidationError}`}
                  >
                    <span
                      className={`${classNamesLib.formValidationText} ${classNamesLib.formValidationTextError}`}
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
              ${classNamesLib.button}
              ${classNamesLib.buttonTransparent}
              ${classNamesLib.buttonTransparentDark}
              basis-full
            `}
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            type='submit'
            form='createSpaceForm'
            className={`${classNamesLib.button} ${classNamesLib.buttonDecensored} basis-full`}
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
