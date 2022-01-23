import type { NextPage } from 'next'
import React from 'react'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'
import SpaceHeader from 'components/Spaces/SpaceHeader'

const Spaces: NextPage = () => (
  <>
    <Header />
    <SpaceHeader />
    <Bottombar />
  </>
)

export default Spaces
