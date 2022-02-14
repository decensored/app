import type { NextPage } from 'next'
import React from 'react'
import Feed from 'components/Feed/Feed'
import Seo from 'components/Scaffolding/Seo'

const Home: NextPage = () => (
  <>
    <Seo />
    <Feed />
  </>
)

export default Home
