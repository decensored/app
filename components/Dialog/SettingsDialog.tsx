import React, { FunctionComponent } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Icon from 'components/Icons/Icon'
import useStore from 'lib/store'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import TextareaAutosize from 'react-textarea-autosize'
import { style } from 'styles/style'
import BaseDialog from 'components/Dialog/BaseDialog'

interface SettingsDialogProps {
  showDialog: boolean
  onClose: () => void
}

const SettingsDialog: FunctionComponent<SettingsDialogProps> = ({ showDialog, onClose }) => {
  const { contract, nodeInfo, defaultNodeInfo, setNodeInfo, cacheFlush, setDefaultNodeInfo } = useStore((state) => ({
    contract: state.contract,
    nodeInfo: state.nodeInfo,
    defaultNodeInfo: state.defaultNodeInfo,
    setNodeInfo: state.setNodeInfo,
    cacheFlush: state.cacheFlush,
    setDefaultNodeInfo: state.setDefaultNodeInfo,
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
    cacheFlush()
    setNodeInfo({
      evmNode: data.evmNode,
      contractsAddress: data.contractAddress,
    })
    onClose()
  }

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Node Settings'
      body={
        <form id='settingsForm' onSubmit={handleSubmit(onSubmit)}>
          <div className={`${style.alert} ${style.alertDark} mb-5`}>
            {defaultNodeInfo && (
              <span>Decensored runs on an IOTA node. If you want to use your own node, that&apos;s no problem. </span>
            )}
            <button
              onClick={() => setDefaultNodeInfo(!defaultNodeInfo)}
              type='button'
              className={style.buttonInlineLink}
            >
              <span className={`${style.link} ${style.linkDark}`}>
                {defaultNodeInfo ? 'Logout and activate custom node settings' : 'Logout and switch to default node'}.
              </span>
            </button>
          </div>
          <div className={`${defaultNodeInfo ? 'pointer-events-none opacity-20' : ''}`}>
            <div>
              <div className={style.inputWrapper}>
                <span
                  className={`
                    ${style.inputLabel}
                    ${style.inputLabelDark}
                  `}
                >
                  EVM-Node
                </span>
                <input
                  className={`
                ${style.input}
                ${style.inputDefault}
                ${style.inputDefaultDark}
                ${style.inputFocus}
              `}
                  type='text'
                  defaultValue={nodeInfo.evmNode}
                  {...register('evmNode', { required: true })}
                />
                {errors.evmNode && (
                  <div className={`${style.formValidation} ${style.formValidationError}`}>
                    <span className={`${style.formValidationText} ${style.formValidationTextError}`}>
                      Required Field
                    </span>
                  </div>
                )}

                {!nodeIsUpAndRunning(contract) && (
                  <div className={`${style.formValidation} ${style.formValidationError}`}>
                    <Icon
                      icon='faExclamationTriangle'
                      className={`${style.formValidationText} ${style.formValidationTextError} mr-3`}
                    />
                    <span className={`${style.formValidationText} ${style.formValidationTextError}`}>
                      Connection failed!
                    </span>
                  </div>
                )}
              </div>

              <div className={style.inputWrapper}>
                <span
                  className={`
                ${style.inputLabel}
                ${style.inputLabelDark}
              `}
                >
                  Contract Address
                </span>
                <TextareaAutosize
                  minRows={2}
                  className={`
                ${style.form}
                ${style.input}
                ${style.inputDefault}
                ${style.inputDefaultDark}
                ${style.inputFocus}
                ${style.inputPlaceholder}
                ${style.inputPlaceholderDark}
              `}
                  {...register('contractAddress', { required: true })}
                >
                  {nodeInfo.contractsAddress}
                </TextareaAutosize>
                {errors.contractAddress && (
                  <div className={`${style.formValidation} ${style.formValidationError}`}>
                    <span className={`${style.formValidationText} ${style.formValidationTextError}`}>
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
            ${style.button}
            ${style.buttonTransparent}
            ${style.buttonTransparentDark}
            ${style.buttonFull}
          `}
            onClick={() => onClose()}
          >
            Cancel
          </button>

          <button
            type='submit'
            form='settingsForm'
            className={`
              ${style.button}
              ${style.buttonDecensored}
              ${style.buttonFull}
            `}
          >
            Confirm
          </button>
        </>
      }
    />
  )
}

export default SettingsDialog
