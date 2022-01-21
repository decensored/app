import type { NextPage } from 'next'
import React from 'react'
import Header from '../components/Header'
import Feed from '../components/Feed/Feed'
import Bottombar from '../components/Bottombar'

const Home: NextPage = () => (
  <main>
    <Header />
    <Feed />
    <Bottombar />
  </main>
)

export default Home
