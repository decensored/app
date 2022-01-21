import type { NextPage } from 'next'
import React from 'react'
import Header from '../../components/Header'
import Bottombar from '../../components/Bottombar'
import SpaceHeader from '../../components/Spaces/SpaceHeader'

const Spaces: NextPage = () => (
  <main>
    <Header />
    <SpaceHeader />
    <Bottombar />
  </main>
)

export default Spaces
