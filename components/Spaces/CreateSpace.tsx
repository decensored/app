import React, { FunctionComponent, useState } from 'react'
import CreateSpaceDialog from 'components/Dialog/CreateSpaceDialog'
import { style } from 'styles/style'

const CreateSpace: FunctionComponent = () => {
  const [openCreateSpaceDialog, setOpenCreateSpaceDialog] = useState(false)

  return (
    <>
      <div
        id='create-space'
        className={`${style.feedItemWrapper} ${style.feedItemWrapperDark}`}
      >
        <div className='p-5'>
          <div className='flex flex-col justify-center items-center'>
            <p className='text-3xl mb-1 text-gray-900 dark:text-gray-300'>
              Start New Space
            </p>
            <p className='text-md mb-4'>Build your own Galaxy</p>
            <button
              type='button'
              onClick={() => setOpenCreateSpaceDialog(true)}
              className='bg-decensored-900 hover:bg-purple-800 text-white
        font-medium py-2 px-3 rounded cursor-pointer'
            >
              Create Space
            </button>
          </div>
        </div>
      </div>
      <CreateSpaceDialog
        showDialog={openCreateSpaceDialog}
        onClose={() => setOpenCreateSpaceDialog(false)}
      />
    </>
  )
}

export default CreateSpace
