import type { NextPage } from 'next'
import React from 'react'
import { useRouter } from 'next/router'
import useStore from 'lib/store'
import { getLevel1PostForReply, getPostById } from 'lib/storeUtils'
import { style } from 'styles/style'
import FeedItem from 'components/Feed/FeedItem'
import Link from 'next/link'
import Tag from 'components/Tags/Tag'
import Seo from 'components/Scaffolding/Seo'

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

  const noPostFound = {
    title: 'You found a black hole!',
    description: 'The post you want to open does not exist anymore, or maybe it does not exist yet? 🤔',
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
      <Seo title={`${post.username} in ${post.spaceName}`} description={post.message} />
    </div>
  ) : (
    <>
      <div className={style.feedWrapper}>
        <div
          className={`
        ${style.postNotFound}
        ${style.feedItemWrapper}
        ${style.feedItemWrapperDark}
        ${style.feedItemInner}
      `}
        >
          <div className={style.postNotFoundHeadline}>{noPostFound.title}</div>
          <div className={style.postNotFoundSubline}>{noPostFound.description}</div>
        </div>
      </div>
      <Seo title={noPostFound.title} description={noPostFound.description} />
    </>
  )
}

export default PostPage
