import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'

const User: NextPage = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <>
      <Header />
      <h1>User {username} </h1>
      <Bottombar />
    </>
  )
}

export default User
