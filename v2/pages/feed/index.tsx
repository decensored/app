import type { NextPage } from 'next'
import React from 'react'
import Header from '../../components/Header/Header'
import Bottombar from '../../components/Navigations/Bottom'

const Feed: NextPage = () => (
  <main>
    <Header />
    <h1>FEED</h1>
    <Bottombar />
  </main>
)

export default Feed
