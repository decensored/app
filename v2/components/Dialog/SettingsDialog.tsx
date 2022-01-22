import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
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
      <div className='flex fixed top-20 w-full mx-auto items-center justify-center'>
        <Dialog.Overlay className='fixed inset-0 bg-black opacity-30' />
        <div className='relative w-3/4 bg-white rounded max-w-sm mx-auto p-8'>
          <Dialog.Title className='text-xl text-bold'>
            Node Settings
          </Dialog.Title>
          <Dialog.Description>
            <form
              id='settingsForm'
              className='w-full max-w-lg pt-10'
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className='flex flex-wrap -mx-3 mb-6 sm:mb-4'>
                <div className='w-4/6 px-3 mb-6 md:mb-0'>
                  <span className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                    EVM-Node
                  </span>
                  <input
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                    className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
                    className='appearance-none lining-nums block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
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
          </Dialog.Description>
          <div className='flex justify-between'>
            <div className='flex-1'>
              <button
                type='button'
                className='py-3 px-12 rounded cursor-pointer bg-gray-400 hover:bg-gray-500 text-white'
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
            <div className='flex-1'>
              <button
                type='submit'
                form='settingsForm'
                className='py-3 px-12 rounded cursor-pointer bg-decensored-700 hover:bg-decensored-600 text-white'
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
