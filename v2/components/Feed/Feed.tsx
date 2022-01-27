import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const { posts } = useStore((state) => ({
    posts: state.posts,
  }))

  // GET DATA FOR FEED
  const [feedPosts, setFeedPosts] = React.useState<
    {
      id: number
      username: string
      message: string
      author: number
      timestamp: string
      space: number
      spaceName: string
      mother_post: number
    }[]
  >()

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
      <FeedItem key={post.id} type='feed' {...post} />
    ))
  }
  return (
    <div className={classNamesLib.container}>
      <div id='posts' className={classNamesLib.feedWrapper}>
        {showFeedItems}
      </div>
    </div>
  )
}

export default Feed
