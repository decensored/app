import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../../components/Header/Header'
import Bottombar from '../../components/Navigations/Bottom'

const User: NextPage = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <main>
      <Header />
      <h1>User {username} </h1>
      <Bottombar />
    </main>
  )
}

export default User
