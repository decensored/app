import type { NextPage } from 'next'
import React from 'react'
import useStore from '../lib/store';
import Head from 'next/head'
import Header from '../components/Header'
import Feed from '../components/Feed/Feed'
import Bottombar from '../components/Bottombar'

const Home: NextPage = () => {

  const { isSignedUp, setSignUpState } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setSignUpState: state.setSignUpState,
  }));

  return (
    <>
      <Head>
        <title>Decensored</title>
        <meta name="description" content="Decensored" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="../images/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="../images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="../images/favicon/favicon-16x16.png"
        />
      </Head>

      <main>
        <Header isSignedUp={isSignedUp} />
          <Feed isSignedUp={isSignedUp}/>
        <Bottombar isSignedUp={isSignedUp}/>
      </main>
    </>
  );
};

export default Home;
