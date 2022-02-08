import type { NextPage } from 'next'
import React from 'react'
import { style } from 'styles/style'
import Header from 'components/Scaffolding/Header'
import Feed from 'components/Feed/Feed'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'

const Home: NextPage = () => (
  <>
    <Header />
    <div className={style.bodyContainer}>
      <div className={`${style.bodyContainerCol1}`}>
        <AsideNavigation />
      </div>
      <div className={style.bodyContainerCol2}>
        <Feed />
      </div>
    </div>
    <BottomNavigation />
  </>
)

export default Home
