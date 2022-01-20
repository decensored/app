import type { NextPage } from 'next'
import React from 'react'
import useStore from '../../lib/store.js'
import Header from '../../components/Header'
import Bottombar from '../../components/Bottombar'
import SpaceHeader from '../../components/Spaces/SpaceHeader'

const Spaces: NextPage = () => {
  const { isSignedUp /* , setSignUpState */ } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    // setSignUpState: state.setSignUpState,
  }))

  return (
    <main>
      <Header isSignedUp={isSignedUp} />
      <SpaceHeader />
      <Bottombar isSignedUp={isSignedUp} />
    </main>
  )
}

export default Spaces
