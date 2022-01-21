import React, { FunctionComponent } from 'react'
import useStore from '../../lib/store'
import SpaceItem from './SpaceItem'

const SpaceHeader: FunctionComponent = () => {
  const isSignedUp = useStore((state) => state.isSignedUp)

  return (
    <div id='spaces'>
      <div
        className='container mx-auto py-10 px-3
      max-w-md flex flex-col gap-y-5 mb-28'
      >
        {isSignedUp && (
          <div
            id='create-space'
            className='p-5 bg-white dark:bg-gray-900 rounded shadow-sm mb-5'
          >
            <div className='p-5'>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-3xl mb-1 text-gray-900 dark:text-gray-300'>
                  Start a new space
                </p>
                <p className='text-md mb-4'>Build your own network</p>
                <button
                  type='button'
                  className='bg-decensored-900 hover:bg-purple-800 text-white
                font-medium py-2 px-3 rounded cursor-pointer'
                >
                  Create space
                </button>
              </div>
            </div>
          </div>
        )}
        <div className='flex flex-col gap-y-5 mb-28'>
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
        </div>
      </div>
    </div>
  )
}

export default SpaceHeader
