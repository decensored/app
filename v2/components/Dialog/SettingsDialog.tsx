import React, { FunctionComponent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import useStore from 'lib/store'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BaseDialog from 'components/Dialog/BaseDialog'

const SettingsDialog: FunctionComponent = () => {
  const {
    contract,
    nodeInfo,
    setNodeInfo,
    isOpenSettingsDialog,
    setIsOpenSettingsDialog,
  } = useStore((state) => ({
    contract: state.contract,
    nodeInfo: state.nodeInfo,
    setNodeInfo: state.setNodeInfo,
    isOpenSettingsDialog: state.isOpenSettingsDialog,
    setIsOpenSettingsDialog: state.setIsOpenSettingsDialog,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    evmNode: string
    contractAddress: string
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setNodeInfo({
      evmNode: data.evmNode,
      contractPostsAddress: data.contractAddress,
    })
    setIsOpenSettingsDialog(false)
  }

  const handleClose = (): void => {
    setIsOpenSettingsDialog(false)
  }

  return (
    <BaseDialog
      showDialog={isOpenSettingsDialog}
      onClose={handleClose}
      header='Node Settings'
      body={
        <form id='settingsForm' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-3 gap-x-4 gap-y-8'>
            <div className='col-span-3'>
              <span
                className={`
                  ${classNamesLib.dialogLabel}
                  ${classNamesLib.dialogLabelDark}
                `}
              >
                EVM-Node
              </span>
              <div className={classNamesLib.inputWrapper}>
                <input
                  className={`
                    ${classNamesLib.input}
                    ${classNamesLib.inputDark}
                  `}
                  type='text'
                  defaultValue={nodeInfo.evmNode}
                  {...register('evmNode', { required: true })}
                />
                {errors.evmNode && (
                  <div
                    className={`${classNamesLib.formValidation} ${classNamesLib.formValidationError}`}
                  >
                    <span
                      className={`${classNamesLib.formValidationText} ${classNamesLib.formValidationTextError}`}
                    >
                      Required Field
                    </span>
                  </div>
                )}
                {!nodeIsUpAndRunning(contract) && (
                  <div
                    className={`${classNamesLib.formValidation} ${classNamesLib.formValidationError}`}
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      className='animate-pulse text-red-500'
                    />
                    <span
                      className={`${classNamesLib.formValidationText} ${classNamesLib.formValidationTextError}`}
                    >
                      &nbsp;&nbsp;Connection failed!
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* <div className=''>
                  <span
                    className={`
                      ${classNamesLib.dialogLabel}
                      ${classNamesLib.dialogLabelDark}
                    `}
                  >
                    Chain-ID
                  </span>
                  <input
                    className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
                    type='text'
                    defaultValue={chainId}
                    {...register('chainId', { required: true })}
                  />
                  {errors.chainId && (
                    <span className='text-red-500 text-sm'>Required Field</span>
                  )}
                </div> */}
            <div className='col-span-3'>
              <span
                className={`
                  ${classNamesLib.dialogLabel}
                  ${classNamesLib.dialogLabelDark}
                `}
              >
                Contract Address
              </span>
              <div className={classNamesLib.inputWrapper}>
                <input
                  className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
                  type='text'
                  defaultValue={nodeInfo.contractPostsAddress}
                  {...register('contractAddress', { required: true })}
                />
                {errors.contractAddress && (
                  <div
                    className={`${classNamesLib.formValidation} ${classNamesLib.formValidationError}`}
                  >
                    <span
                      className={`${classNamesLib.formValidationText} ${classNamesLib.formValidationTextError}`}
                    >
                      Required Field
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
            onClick={() => setIsOpenSettingsDialog(false)}
          >
            Cancel
          </button>
          <button
            type='submit'
            form='settingsForm'
            className={`${classNamesLib.button} ${classNamesLib.buttonDecensored} basis-full`}
          >
            Confirm
          </button>
        </>
      }
    />
  )
}

export default SettingsDialog
