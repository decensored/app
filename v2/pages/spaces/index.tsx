import React from 'react'
import type { NextPage } from 'next'
import useStore from 'lib/store'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'
import SpaceItem from 'components/Spaces/SpaceItem'
import SpaceHeader from 'components/Spaces/SpaceHeader'
// import { getAllSpaces } from 'api/spaces'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import shallow from 'zustand/shallow'

const Spaces: NextPage = () => {
  const [isSignedUp, spaces /* ,  contract */] = useStore(
    (state) => [state.isSignedUp, state.spaces /* , state.contract */],
    shallow
  )

  // GET DATA FROM AND SET STATE
  // const [spaces, setSpaces] = React.useState<
  //   {
  //     id: number
  //     name: string
  //     owner: number
  //     followers: number
  //     posts: number
  //     whatever: number
  //     img: string
  //   }[]
  // >()

  // React.useEffect(() => {
  //   const doGetSpaces = async (): Promise<void> => {
  //     try {
  //       const result = await getAllSpaces(contract)
  //       setSpaces(result)
  //     } catch (error) {
  //       // throw new Error(`Error ${error}`)
  //     }
  //   }
  //   doGetSpaces()
  // }, [contract, spaces])

  // if (!spaces) {
  //   return null
  // }

  const createSpaceItems = spaces.map((space) => (
    <SpaceItem key={space.id} {...space} />
  ))

  return (
    <>
      <Header />
      <div className={classNamesLib.container}>
        <div className={classNamesLib.feedWrapper}>
          {isSignedUp && <SpaceHeader />}
          <div className={classNamesLib.feedPostsWrapper}>
            {createSpaceItems}
          </div>
        </div>
      </div>
      <Bottombar />
    </>
  )
}

export default Spaces
