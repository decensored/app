import React, { FunctionComponent } from 'react'
// import { getAllPosts } from 'api/feed'
// import useStore from 'lib/store'
// import FeedItem from './FeedItem'

// const { contract, isSignedUp } = useStore((state) => ({
//   isSignedUp: state.isSignedUp,
//   contract: state.contract,
// }))
/* 
  // GET DATA FOR FEED
  const [feedPosts, setFeedPosts] = React.useState<
    {
      id: number
      username: string
      message: string
      author: number
      timestamp: string
      space: number
      mother_post: number
    }[]
  >()

  React.useEffect(() => {
    getAllPosts(contract).then(async (posts) => {
      setFeedPosts(posts)
    })
  }, [contract])

  // CHECK IF DATA IS PRESENT AND CREATE FEEDITEMS
  if (!feedPosts) {
    return null
  }
  let showFeedItems
  if (feedPosts.length > 0) {
    showFeedItems = feedPosts.map((post) => (
      <FeedItem key={post.id} {...post} />
    ))
  } */

const Feed: FunctionComponent = () => (
  <div id='feed'>
    <div className='container mx-auto py-10 px-3 max-w-md flex flex-col gap-y-5 mb-28'>
      <div id='posts' className='flex flex-col gap-y-5 mb-28'>
        {/* {showFeedItems} */}
      </div>
    </div>
  </div>
)

export default Feed
