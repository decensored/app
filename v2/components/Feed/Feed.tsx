import React, { FunctionComponent /* , useEffect, useState */ } from 'react'
// import { Virtuoso } from 'react-virtuoso'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import {
  dequeuePostsAndSpaces,
  // getPostsWithoutMother,
  getRepliesForPost,
} from 'lib/storeUtils'
import FeedItem from './FeedItem'

const Feed: FunctionComponent = () => {
  const { posts, postsQueued } = useStore((state) => ({
    posts: state.posts,
    postsQueued: state.postsQueued,
  }))

  // const [postsWithoutMother, setPostsWithoutMother] = useState([])
  // useEffect(() => setPostsWithoutMother(posts), [posts])

  const showFeedItems = posts.map((post) => {
    if (post.mother_post !== 0) return null

    return (
      <FeedItem
        key={post.timestamp}
        moderator={false}
        replies={getRepliesForPost(posts, post.id)}
        type='feed'
        parent
        {...post}
      />
    )
  })

  // const Row = ({ index }) => {
  //   console.log('Row', index)

  //   const post = posts[index]
  //   const repliesForPost = getRepliesForPost(posts, post.id)

  //   return (
  //     <FeedItem
  //       key={cuid()}
  //       type='feed'
  //       moderator={false}
  //       replies={repliesForPost}
  //       {...post}
  //     />
  //   )
  // }

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
        {/* <Virtuoso
          style={{ height: '600px' }}
          totalCount={posts.length}
          itemContent={(index) => <Row index={index} />}
        /> */}
      </div>
    </>
  )
}

export default Feed
