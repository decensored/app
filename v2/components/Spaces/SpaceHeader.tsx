import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import SpaceItem from 'components/Spaces/SpaceItem'
import { getAllSpaces } from 'api/spaces'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const SpaceHeader: FunctionComponent = () => {
  const [isSignedUp, contract] = useStore(
    (state) => [state.isSignedUp, state.contract],
    shallow
  )

  // GET DATA FROM AND SET STATE
  const [spaces, setSpaces] = React.useState<
    {
      id: number
      name: string
      owner: number
      followers: number
      posts: number
      whatever: number
      img: string
    }[]
  >()

  React.useEffect(() => {
    const doGetSpaces = async (): Promise<void> => {
      try {
        const result = await getAllSpaces(contract)
        setSpaces(result)
      } catch (error) {
        // throw new Error(`Error ${error}`)
      }
    }
    doGetSpaces()
  }, [contract])

  if (!spaces) {
    return null
  }
  const createSpaceItems = spaces.map((space) => (
    <SpaceItem key={space.id} {...space} />
  ))

  return (
    <div className={classNamesLib.container}>
      <div className={classNamesLib.feedWrapper}>
        {isSignedUp && (
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
                  className='bg-highlight-900 hover:bg-purple-800 text-white
                font-medium py-2 px-3 rounded cursor-pointer'
                >
                  Create space
                </button>
              </div>
            </div>
          </div>
        )}
        <div className={classNamesLib.feedPostsWrapper}>{createSpaceItems}</div>
      </div>
    </div>
  )
}

export default SpaceHeader
