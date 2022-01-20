import type { NextPage } from 'next';
import React from 'react';
import useStore from '../lib/store';
import Header from '../components/Header';
import Feed from '../components/Feed/Feed';
import Bottombar from '../components/Bottombar';

const Home: NextPage = () => {
  const { isSignedUp, setSignUpState } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    setSignUpState: state.setSignUpState,
  }));

  return (
    <>
      <main>
        <Header isSignedUp={isSignedUp} />
        <Feed isSignedUp={isSignedUp} />
        <Bottombar isSignedUp={isSignedUp} />
      </main>
    </>
  );
};

export default Home;
