import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { dequeuePostsAndSpaces, getRepliesForPost } from 'lib/storeUtils'
import cuid from 'cuid'
import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const { posts, postsQueued } = useStore((state) => ({
    posts: state.posts,
    postsQueued: state.postsQueued,
  }))

  let showFeedItems
  if (posts.length > 0) {
    showFeedItems = posts.map((post) => {
      const repliesForPost = getRepliesForPost(posts, post.id)
      if (post.mother_post === 0) {
        return (
          <FeedItem
            key={cuid()}
            type='feed'
            moderator={false}
            replies={repliesForPost}
            {...post}
          />
        )
      }
      return null
    })
  }
  return (
    <>
      {postsQueued.length > 0 && (
        <button
          type='button'
          onClick={dequeuePostsAndSpaces}
          className={`
            ${classNamesLib.buttonTransparent}
            ${classNamesLib.buttonTransparentDark}
            w-full text-center underline hover:no-underline pb-5
          `}
        >
          {postsQueued.length === 1 && 'Click to see a new post'}
          {postsQueued.length > 1 &&
            `Click to see ${postsQueued.length} new posts`}
        </button>
      )}
      <div id='posts' className={classNamesLib.feedWrapper}>
        {showFeedItems}
      </div>
    </>
  )
}

export default Feed
