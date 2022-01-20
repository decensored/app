import type { NextPage } from 'next'
import useStore from '../../lib/store';
import React from 'react'
import Head from 'next/head'
import Header from '../../components/Header'
import Bottombar from '../../components/Bottombar'
import SpaceHeader from '../../components/Spaces/SpaceHeader';

const Spaces: NextPage = () => {

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
          <SpaceHeader />
        <Bottombar isSignedUp={isSignedUp}/>
      </main>
    </>
  )
}

export default Spaces
