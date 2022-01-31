import React from 'react'
import type { NextPage } from 'next'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import { BrowserView, MobileView } from 'react-device-detect'
import SpaceItem from 'components/Spaces/SpaceItem'
import SpaceHeader from 'components/Spaces/SpaceHeader'
import { style } from 'styles/style'
import { getNumberOfPostsInSpace } from 'lib/storeUtils'

const Spaces: NextPage = () => {
  const [isSignedUp, spaces, posts] = useStore(
    (state) => [state.isSignedUp, state.spaces, state.posts],
    shallow
  )

  const createSpaceItems = spaces.map((space) => (
    <SpaceItem
      key={space.id}
      {...space}
      numberOfPostsInSpace={getNumberOfPostsInSpace(posts, space)}
    />
  ))

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <div className={style.bodyContainerCol2}>
          <div className={style.feedWrapper}>
            {isSignedUp && <SpaceHeader />}
            {createSpaceItems}
          </div>
        </div>
        <BrowserView className={style.bodyContainerCol1}>
          <AsideNavigation />
        </BrowserView>
      </div>
      <MobileView>
        <BottomNavigation />
      </MobileView>
    </>
  )
}

export default Spaces
