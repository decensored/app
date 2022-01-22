import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { classNamesLib } from '../ClassNames/Lib'
import useStore from 'lib/store'

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
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
        <div className={classNamesLib.dialogInner}>
          <Dialog.Title
            className={`
              ${classNamesLib.dialogHeader}
              p-4
            `}
          >
            Node Settings
          </Dialog.Title>
          <div className='p-8'>
            <form
              id='settingsForm'
              className='w-full max-w-lg'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='flex flex-wrap -mx-3 mb-6 sm:mb-4'>
                <div className='w-4/6 px-3 mb-6 md:mb-0'>
                  <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    EVM-Node
                  </span>
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
                <div className='w-2/6 px-3'>
                  <span>Chain-ID</span>
                  <input
                    className={`
                        ${classNamesLib.input}
                        ${classNamesLib.inputDark}
                      `}
                    type='text'
                    defaultValue={chainId}
                    {...register('chainId', { required: true })}
                  />
                  {errors.chainId && (
                    <span className='text-red-500 text-sm'>Required Field</span>
                  )}
                </div>
              </div>
              <div className='flex flex-wrap -mx-3 mb-6 sm:mb-4'>
                <div className='w-full px-3'>
                  <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    Contract Address
                  </span>
                  <input
                    className={`
                        ${classNamesLib.input}
                        ${classNamesLib.inputDark}
                      `}
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
          <div className='flex justify-between p-4'>
            <div className='flex-1'>
              <button
                type='button'
                className={`
                ${classNamesLib.button}
                ${classNamesLib.buttonTransparent}
                h-[48px]
                w-full
                `}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
            <div className='flex-1'>
              <button
                type='submit'
                form='settingsForm'
                className={`
                  ${classNamesLib.button}
                  ${classNamesLib.buttonDecensored}
                  h-[48px]
                  w-full
                `}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default SettingsDialog
