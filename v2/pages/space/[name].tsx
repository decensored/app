import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import useStore from '../../lib/store.js'
import Header from '../../components/Header'
import Bottombar from '../../components/Bottombar'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  const { isSignedUp /* , setSignUpState */ } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    // setSignUpState: state.setSignUpState,
  }))

  return (
    <main>
      <Header isSignedUp={isSignedUp} />
      <h1>SPACE {name} </h1>
      <Bottombar isSignedUp={isSignedUp} />
    </main>
  )
}

export default Space
