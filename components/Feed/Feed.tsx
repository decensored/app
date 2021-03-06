import React, { FunctionComponent, useEffect, useRef, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import type { PostType } from 'lib/types'
import useStore from 'lib/store'
import { style } from 'styles/style'
import { arePostsOrSpacesLoading, dequeuePostsAndSpaces, getRootLevelPosts } from 'lib/storeUtils'
import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const { posts, postsQueued, postsLoaded, spacesLoaded } = useStore((state) => ({
    posts: state.posts,
    postsQueued: state.postsQueued,
    postsLoaded: state.postsLoaded, // this should be in its own component
    spacesLoaded: state.spacesLoaded,
  }))

  const [rootLevelPosts, setRootLevelPosts] = useState([] as PostType[])
  useEffect(() => setRootLevelPosts(getRootLevelPosts(posts)), [posts])

  const virtuoso = useRef<VirtuosoHandle>(null)

  const handleDequeuePosts = () => {
    dequeuePostsAndSpaces()
    window.scrollTo(0, 0)
    // if (!virtuoso?.current) return
    // virtuoso.current.scrollToIndex({
    //   index: 0,
    //   behavior: 'smooth',
    // })
  }

  return (
    <>
      <div className={style.dequeuePostsAndSpacesWrapper}>
        {postsQueued.length > 0 && !arePostsOrSpacesLoading(postsLoaded, spacesLoaded) && (
          <button type='button' onClick={handleDequeuePosts} className={style.dequeuePostsAndSpacesButton}>
            {postsQueued.length === 1 && 'Click to see a new post'}
            {postsQueued.length > 1 && `Click to see ${postsQueued.length} new posts`}
          </button>
        )}
      </div>

      <div id='posts'>
        <Virtuoso
          useWindowScroll
          data={rootLevelPosts}
          totalCount={rootLevelPosts.length}
          ref={virtuoso}
          className={`
              ${style.feedWrapper}
              h-body
            `}
          itemContent={(_, post) => (
            <div className={style.virtuosoFeedItemWrapper}>
              <FeedItem key={`post-${post.id}`} moderator={false} type='feed' parent post={post} />
            </div>
          )}
        />
      </div>
    </>
  )
}

export default Feed
