import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const SpaceHeader: FunctionComponent = () => {
  const [setIsOpenCreateSpaceDialog] = useStore(
    (state) => [state.setIsOpenCreateSpaceDialog],
    shallow
  )
  return (
    <div
      className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark} p-5`}
    >
      <div className={classNamesLib.feedItemInner}>
        <div className='flex flex-col justify-center items-center'>
          <p className='text-3xl mb-1 text-gray-900 dark:text-gray-300'>
            Start a new space
          </p>
          <p className='text-md mb-4'>Build your own network</p>
          <button
            type='button'
            onClick={() => {
              setIsOpenCreateSpaceDialog(true)
            }}
            className='bg-highlight-900 hover:bg-purple-800 text-white
      font-medium py-2 px-3 rounded cursor-pointer'
          >
            Create space
          </button>
        </div>
      </div>
    </div>
  )
}

export default SpaceHeader
