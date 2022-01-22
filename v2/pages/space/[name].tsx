import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../components/Header/Header'
import Bottombar from '../../components/BottomNavigation/BottomNavigation'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  return (
    <main>
      <Header />
      <h1>SPACE {name} </h1>
      <Bottombar />
    </main>
  )
}

export default Space
