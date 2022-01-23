import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import Form from './Form'
import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const isSignedUp = useStore((state) => state.isSignedUp)

  return (
    <div id='feed'>
      <div className='container mx-auto py-10 px-3 max-w-md flex flex-col gap-y-5 mb-28'>
        {isSignedUp && <Form />}
        <div id='posts' className='flex flex-col gap-y-5 mb-28'>
          <FeedItem />
          <FeedItem />
          <FeedItem />
        </div>
      </div>
    </div>
  )
}

export default Feed
