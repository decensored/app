import React, { FunctionComponent } from 'react'
import { classNamesLib } from '../ClassNames/ClassNames'

/*
  TODO: add Logic for showing / hiding it
*/
const SettingsModal: FunctionComponent = () => (
  <div
    id='settings_dialog'
    className='hidden fixed left-0 top-0 right-0 h-screen opacity-0
      flex justify-center pt-5 items-start sm:items-center inset-0
      bg-black bg-opacity-30 dark:bg-opacity-80 overflow-y-auto h-full w-full'
  >
    <div
      className='relative shadow-xl rounded bg-white dark:bg-gray-900
      divide-y divide-solid divide-gray-200 dark:divide-gray-800
      w-96 max-w-[90%]'
    >
      <div className='px-8 py-6' id='settings_dialog_inner'>
        <h3 className='text-lg leading-6 font-medium text-center mb-8'>
          Settings
        </h3>
        <div id='settings_node' className='mt-8'>
          <div className='my-5'>
            <div className='text-xs text-gray-900 dark:text-gray-300 mb-2'>
              Node URL
            </div>
            <input
              id='evm_node'
              className={`
                ${classNamesLib.input}
                ${classNamesLib.inputDark}
              `}
            />
          </div>
          <div className='my-5'>
            <div className='text-xs text-gray-900 dark:text-gray-300 mb-2'>
              Chain ID
            </div>
            <input
              id='chain_id'
              type='number'
              className={`
                ${classNamesLib.input}
                ${classNamesLib.inputDark}
              `}
            />
          </div>
        </div>
      </div>
      <div className='flex gap-x-5 p-4'>
        <div className='grow'>
          <button
            type='button'
            className={`
              ${classNamesLib.button}
              ${classNamesLib.buttonTransparent}
              h-[48px]
              w-full
            `}
          >
            Close
          </button>
        </div>
        <div className='grow' id='save_node_settings_button'>
          <button
            type='button'
            className={`
              ${classNamesLib.button}
              ${classNamesLib.buttonDecensored}
              h-[48px]
              w-full
            `}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
)

export default SettingsModal
