import type { NextPage } from 'next'
import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { useRouter } from 'next/router'
import useStore from 'lib/store'
import { getLevel1PostForReply, getPostById } from 'lib/storeUtils'
import { style } from 'styles/style'
import FeedItem from 'components/Feed/FeedItem'
import Link from 'next/link'
import Tag from 'components/Tags/Tag'

const PostPage: NextPage = () => {
  const router = useRouter()
  const posts = useStore((state) => state.posts)

  if (!router.query.postId) return null
  const postId = parseInt(router.query.postId as string, 10)
  const post = getPostById(posts, postId)

  let parentPost
  if (post.id > 0 && post.mother_post !== 0) {
    parentPost = getLevel1PostForReply(posts, post.mother_post)
    console.log(parentPost)
  }

  return post?.id ? (
    <div className={style.feedWrapper}>
      {parentPost && (
        <div className='flex'>
          <span>Answer to</span>
          <Link href={`/post/${parentPost[0].id}`} passHref>
            <a href='passed' className='px-2'>
              <Tag clickable>Post</Tag>
            </a>
          </Link>
          <span>from</span>
          <Link href={`/user/${parentPost[0].username}`} passHref>
            <a href='passed' className='pl-2'>
              <Tag clickable>{parentPost[0].username}</Tag>
            </a>
          </Link>
        </div>
      )}
      <FeedItem key={`post-${post.id}`} moderator={false} type='feed' parent post={post} />
      <HelmetProvider>
        <Helmet prioritizeSeoTags>
          <title>
            Post by {post.username} in {post.spaceName}
          </title>
          <meta name='description' content={post.message} />
        </Helmet>
      </HelmetProvider>
    </div>
  ) : (
    <div className={style.feedWrapper}>
      <div
        className={`
        ${style.postNotFound}
        ${style.feedItemWrapper}
        ${style.feedItemWrapperDark}
        ${style.feedItemInner}
      `}
      >
        <div className={style.postNotFoundHeadline}>You found a black hole!</div>
        <div className={style.postNotFoundSubline}>
          The post you want to open doesn&apos;t exist anymore, or maybe it doesn&apos;t exist yet? 🤔
        </div>
      </div>
    </div>
  )
}

export default PostPage
