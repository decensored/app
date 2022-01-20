import type { NextPage } from 'next'
import useStore from '../../lib/store';
import { useRouter } from 'next/router'
import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Bottombar from '../../components/Bottombar'

const User: NextPage = () => {

  const router = useRouter()
  const { username } = router.query

  const { isSignedUp, setSignUpState } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setSignUpState: state.setSignUpState,
  }));

  return (
    <>
      <Head>
        <title>Decensored</title>
        <meta name="description" content="Decensored" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header isSignedUp={isSignedUp} />
          <h1>User {username} </h1>
        <Bottombar isSignedUp={isSignedUp}/>
      </main>
    </>
  )
}

export default User
