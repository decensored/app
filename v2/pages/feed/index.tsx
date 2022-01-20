import type { NextPage } from 'next'
import React from 'react'
import useStore from '../../lib/store.js'
import Header from '../../components/Header'
import Bottombar from '../../components/Bottombar'

const Feed: NextPage = () => {
  const { isSignedUp /* , setSignUpState */ } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    // setSignUpState: state.setSignUpState,
  }))

  return (
    <main>
      <Header isSignedUp={isSignedUp} />
      <h1>FEED</h1>
      <Bottombar isSignedUp={isSignedUp} />
    </main>
  )
}

export default Feed
