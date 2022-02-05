import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import useStore from 'lib/store'
import { getNumberOfRepliesForPostRecursive, getPostById, getRepliesForPost } from 'lib/storeUtils'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import { style } from 'styles/style'
import FeedItem from 'components/Feed/FeedItem'
import Header from '../../components/Header/Header'
import BottomNavigation from '../../components/Navigation/BottomNavigation'

const PostPage: NextPage = () => {
  const router = useRouter()
  const posts = useStore((state) => state.posts)
  // console.log('posts', posts)

  if (!router.query.postId) return null
  const postId = parseInt(router.query.postId as string, 10)
  // console.log('postId', postId)

  const post = getPostById(posts, postId)
  // console.log('post', post)

  return (
    <>
      <Header />

      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1} hide-on-handheld`}>
          <AsideNavigation />
        </div>

        <div className={style.bodyContainerCol2}>
          {post?.id ? (
            <FeedItem
              key={`post-${post.id}`}
              moderator={false}
              replies={getRepliesForPost(posts, post.id)}
              nRepliesRecursive={getNumberOfRepliesForPostRecursive(posts, post.id)}
              type='feed'
              parent
              post={post}
            />
          ) : (
            `Post ${postId} not found`
          )}
        </div>
      </div>

      <div className='hide-on-desktop'>
        <BottomNavigation />
      </div>
    </>
  )
}

export default PostPage
