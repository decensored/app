import React from 'react'
import Form from './Form'
import FeedItem from './FeedItem'

const Feed = (props: { isSignedUp: boolean }) => (
  <div id='feed'>
    <div
      className='container mx-auto py-10 px-3 
      max-w-md flex flex-col gap-y-5 mb-28'
    >
      {props.isSignedUp && <Form />}
      <div id='posts' className='flex flex-col gap-y-5 mb-28'>
        <FeedItem />
        <FeedItem />
        <FeedItem />
      </div>
    </div>
  </div>
)

export default Feed
