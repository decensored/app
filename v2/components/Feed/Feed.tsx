import React, { FunctionComponent } from 'react'
import type { PostType } from 'lib/types'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { dequeuePostsAndSpaces } from 'lib/storeUtils'
import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const { posts, postsQueued } = useStore((state) => ({
    posts: state.posts,
    postsQueued: state.postsQueued,
  }))

  // GET DATA FOR FEED
  const [feedPosts, setFeedPosts] = React.useState<PostType[]>()

  React.useEffect(() => {
    setFeedPosts(posts)
  }, [posts])

  // CHECK IF DATA IS PRESENT AND CREATE FEEDITEMS
  if (!posts || !feedPosts) {
    return null
  }
  let showFeedItems
  if (feedPosts.length > 0) {
    showFeedItems = feedPosts.map((post) => (
      <FeedItem key={post.id} type='feed' moderator={false} {...post} />
    ))
  }
  return (
    <>
      {postsQueued.length > 0 && (
        <button
          type='button'
          onClick={dequeuePostsAndSpaces}
          className='w-full bg-highlight-900 hover:bg-highlight-700 mb-5 p-3 text-white'
        >
          Show new posts
        </button>
      )}
      <div id='posts' className={classNamesLib.feedWrapper}>
        {showFeedItems}
      </div>
    </>
  )
}

export default Feed
