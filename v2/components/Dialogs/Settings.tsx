export default function SettingsModal() {
  /*
        TODO: add Logic for showing / hiding it
    */

  return (
    <div
      id='settings_dialog'
      className='hidden fixed left-0 top-0 right-0 h-screen opacity-0 flex justify-center pt-5 items-start sm:items-center inset-0 bg-black bg-opacity-30 dark:bg-opacity-80 overflow-y-auto h-full w-full'
    >
      <div className='relative shadow-xl rounded bg-white dark:bg-gray-900 divide-y divide-solid divide-gray-200 dark:divide-gray-800 w-96 max-w-[90%]'>
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
                className='form-input p-3 h-10 w-full rounded dark:bg-black border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700'
              ></input>
            </div>
            <div className='my-5'>
              <div className='text-xs text-gray-900 dark:text-gray-300 mb-2'>
                Chain ID
              </div>
              <input
                id='chain_id'
                type='number'
                className='form-input p-3 h-10 rounded dark:bg-black border border-gray-300 dark:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-700'
              ></input>
            </div>
          </div>
        </div>
        <div className='flex gap-x-5 p-4'>
          <div className='grow'>
            <button className='w-full bg-transparent text-gray-900 hover:text-purple-900 dark:text-gray-500 font-medium py-2 px-3 rounded cursor-pointer'>
              Close
            </button>
          </div>
          <div className='grow' id='save_node_settings_button'>
            <button className='w-full bg-decensored-900 hover:bg-purple-800 text-white font-medium py-2 px-3 rounded cursor-pointer'>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
