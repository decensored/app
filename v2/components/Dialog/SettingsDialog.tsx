import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import useStore from 'lib/store'
import { classNamesLib } from '../ClassNames/Lib'

interface RegisterProps {
  isOpen: boolean
  setIsOpen: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const SettingsDialog: FunctionComponent<RegisterProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const {
    evmNode,
    setEVMnode,
    chainId,
    setChainId,
    contractAddress,
    setContractPostsAddress,
  } = useStore((state) => ({
    evmNode: state.evmNode,
    setEVMnode: state.setEVMnode,
    chainId: state.chainId,
    setChainId: state.setChainId,
    contractAddress: state.contractPostsAddress,
    setContractPostsAddress: state.setContractPostsAddress,
  }))

  // HANDLE FORM SUBMIT
  type FormValues = {
    evmNode: string
    chainId: number
    contractAddress: string
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setEVMnode(data.evmNode)
    setChainId(data.chainId)
    setContractPostsAddress(data.contractAddress)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <div className={classNamesLib.dialogWrapper}>
        <Dialog.Overlay className={classNamesLib.dialogOverlay} />
        <div className={classNamesLib.dialogInner}>
          <div className={classNamesLib.dialogHeader}>
            <Dialog.Title>Node Settings</Dialog.Title>
          </div>
          <div className={classNamesLib.dialogBody}>
            <form id='settingsForm' onSubmit={handleSubmit(onSubmit)}>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2'>
                  <span className={classNamesLib.dialogLabel}>EVM-Node</span>
                  <input
                    className={`
                        ${classNamesLib.input}
                        ${classNamesLib.inputDark}
                      `}
                    type='text'
                    defaultValue={evmNode}
                    {...register('evmNode', { required: true })}
                  />
                  {errors.evmNode && (
                    <span className='text-red-500 text-sm'>Required Field</span>
                  )}
                </div>
                <div className=''>
                  <span className={classNamesLib.dialogLabel}>Chain-ID</span>
                  <input
                    className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
                    type='text'
                    defaultValue={chainId}
                    {...register('chainId', { required: true })}
                  />
                  {errors.chainId && (
                    <span className='text-red-500 text-sm'>Required Field</span>
                  )}
                </div>
                <div className='col-span-3'>
                  <span className={classNamesLib.dialogLabel}>
                    Contract Address
                  </span>
                  <input
                    className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
                    type='text'
                    defaultValue={contractAddress}
                    {...register('contractAddress', { required: true })}
                  />
                  {errors.contractAddress && (
                    <span className='text-red-500 text-sm'>Required Field</span>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div className={classNamesLib.dialogFooter}>
            <button
              type='button'
              className={`${classNamesLib.button} ${classNamesLib.buttonTransparent} basis-full`}
              onClick={() => setIsOpen(false)}
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
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default SettingsDialog
