import React from 'react'
import type { NextPage } from 'next'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'
import SpaceItem from 'components/Spaces/SpaceItem'
import SpaceHeader from 'components/Spaces/SpaceHeader'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { numberOfPostsInSpace } from 'lib/storeUtils'

const Spaces: NextPage = () => {
  const [isSignedUp, spaces, posts] = useStore(
    (state) => [state.isSignedUp, state.spaces, state.posts],
    shallow
  )

  const createSpaceItems = spaces.map((space) => (
    <SpaceItem
      key={space.id}
      {...space}
      numberOfPostsInSpace={numberOfPostsInSpace(posts, space)}
    />
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
