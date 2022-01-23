import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import Form from './Form'
// import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const isSignedUp = useStore((state) => state.isSignedUp)

  return (
    <div className={classNamesLib.container}>
      <div className={classNamesLib.feedWrapper}>
        {isSignedUp && <Form />}
        <div className={classNamesLib.feedPostsWrapper}>
          {/*
          <FeedItem />
          <FeedItem />
          <FeedItem />
          */}
        </div>
      </div>
    </div>
  )
}

export default Feed
