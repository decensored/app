import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const User: NextPage = () => {
  const router = useRouter()
  const { username } = router.query

  return (
    <>
      <Header />
      <div className={classNamesLib.bodyContainer}>
        <div className={classNamesLib.bodyContainerCol1}>
          <AsideNavigation />
        </div>
        <div className={classNamesLib.bodyContainerCol2}>
          <h1>User {username} </h1>
        </div>
      </div>
    </>
  )
}

export default User
