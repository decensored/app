import React from 'react'
import type { NextPage } from 'next'
import useStore from 'lib/store'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'
import SpaceItem from 'components/Spaces/SpaceItem'
import { getAllSpaces } from 'api/spaces'
import CreateSpace from 'components/Spaces/CreateSpace'

const Spaces: NextPage = () => {
  const { isSignedUp, contract } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    contract: state.contract,
  }))

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
    <>
      <Header />
      <div id='spaces'>
        <div className='container mx-auto py-10 px-3 max-w-md flex flex-col gap-y-5 mb-28'>
          {isSignedUp && <CreateSpace />}
          <div className='flex flex-col gap-y-5 mb-28'>{createSpaceItems}</div>
        </div>
      </div>
      <Bottombar />
    </>
  )
}

export default Spaces
