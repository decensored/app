import React from 'react'
import type { NextPage } from 'next'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import { MobileView } from 'react-device-detect'
import SpaceItem from 'components/Spaces/SpaceItem'
import SpaceHeader from 'components/Spaces/SpaceHeader'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { getNumberOfPostsInSpace } from 'lib/storeUtils'
import cuid from 'cuid'

const Spaces: NextPage = () => {
  const [isSignedUp, spaces, posts] = useStore(
    (state) => [state.isSignedUp, state.spaces, state.posts],
    shallow
  )

  const createSpaceItems = spaces.map((space) => (
    <SpaceItem
      key={cuid()}
      {...space}
      numberOfPostsInSpace={getNumberOfPostsInSpace(posts, space)}
    />
  ))

  return (
    <>
      <Header />
      <div className={classNamesLib.bodyContainer}>
        <div className={classNamesLib.bodyContainerCol2}>
          <div className={classNamesLib.feedWrapper}>
            {isSignedUp && <SpaceHeader />}
            {createSpaceItems}
          </div>
        </div>
        <div className={classNamesLib.bodyContainerCol1}>
          <AsideNavigation />
        </div>
        <MobileView>
          <BottomNavigation />
        </MobileView>
      </div>
    </>
  )
}

export default Spaces
