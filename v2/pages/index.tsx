import type { NextPage } from 'next'
import React from 'react'
import Header from '../components/Header/Header'
import Feed from '../components/Feed/Feed'
import Bottombar from '../components/BottomNavigation/BottomNavigation'

const Home: NextPage = () => (
  <main>
    <Header />
    <Feed />
    <Bottombar />
  </main>
)

export default Home