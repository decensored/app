import React, { FunctionComponent, useEffect, useState } from 'react'
import { Virtuoso } from 'react-virtuoso'
import type { PostType } from 'lib/types'
import useStore from 'lib/store'
import { style } from 'styles/style'
import {
  dequeuePostsAndSpaces,
  getPostsWithoutMother,
  getRepliesForPost,
} from 'lib/storeUtils'
import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const { posts, postsQueued } = useStore((state) => ({
    posts: state.posts,
    postsQueued: state.postsQueued,
  }))

  const [postsWithoutMother, setPostsWithoutMother] = useState([] as PostType[])
  useEffect(() => setPostsWithoutMother(getPostsWithoutMother(posts)), [posts])

  const showFeedItems = posts.map((post) => {
    if (post.mother_post !== 0) return null // it's a reply to something

    return (
      <FeedItem
        key={`post-${post.id}`}
        moderator={false}
        replies={getRepliesForPost(posts, post.id)}
        type='feed'
        parent
        {...post}
      />
    )
  })

  const oldskool = false

  return (
    <>
      <div className={style.dequeuePostsAndSpacesWrapper}>
        {postsQueued.length > 0 && (
          <button
            type='button'
            onClick={dequeuePostsAndSpaces}
            className={`${style.dequeuePostsAndSpacesButton} ${style.dequeuePostsAndSpacesButtonDark}`}
          >
            {postsQueued.length === 1 && 'Click to see a new post'}
            {postsQueued.length > 1 &&
              `Click to see ${postsQueued.length} new posts`}
          </button>
        )}
      </div>

      <div id='posts'>
        {oldskool ? (
          showFeedItems
        ) : (
          <Virtuoso
            data={postsWithoutMother}
            totalCount={postsWithoutMother.length}
            className={`
              ${style.virtuosoWrapper}
              h-screen-virtuoso
            `}
            itemContent={(_, post) => (
              <div className={style.virtuosoFeedItemWrapper}>
                <FeedItem
                  key={`post-${post.id}`}
                  moderator={false}
                  replies={getRepliesForPost(posts, post.id)}
                  type='feed'
                  parent
                  {...post}
                />
              </div>
            )}
          />
        )}
      </div>
    </>
  )
}

export default Feed
