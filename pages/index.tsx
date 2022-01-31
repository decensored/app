import type { NextPage } from 'next'
import React from 'react'
import { style } from 'styles/style'
import { BrowserView, MobileView } from 'react-device-detect'
import Header from 'components/Header/Header'
import Feed from 'components/Feed/Feed'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'

const Home: NextPage = () => (
  <>
    <Header />
    <div className={style.bodyContainer}>
      <BrowserView className={style.bodyContainerCol1}>
        <AsideNavigation />
      </BrowserView>
      <div className={style.bodyContainerCol2}>
        <Feed />
      </div>
    </div>
    <MobileView>
      <BottomNavigation />
    </MobileView>
  </>
)

export default Home
