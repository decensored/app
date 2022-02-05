import type { NextPage } from 'next'
import React from 'react'
import { style } from 'styles/style'
import Header from 'components/Header/Header'
import Feed from 'components/Feed/Feed'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'

const Home: NextPage = () => (
  <>
    <Header />
    <div className={style.bodyContainer}>
      <div className={`${style.bodyContainerCol1} hide-on-handheld`}>
        <AsideNavigation />
      </div>
      <div className={style.bodyContainerCol2}>
        <Feed />
      </div>
    </div>
    <div className='hide-on-desktop'>
      <BottomNavigation />
    </div>
  </>
)

export default Home
