import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getPostsWithHashtag, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { PostType } from 'lib/types'
import { style } from 'styles/style'
import Seo from 'components/Scaffolding/Seo'

const Space: NextPage = () => {
  const router = useRouter()
  const { hashtag } = router.query

  // State Management
  const { posts, contract } = useStore((state) => ({
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    contract: state.contract,
  }))

  const [postsWithHashtag, setPostsWithHashtag] = React.useState<PostType[]>([])

  React.useEffect(() => {
    if (!nodeIsUpAndRunning(contract) || !hashtag) return

    // Get Posts for Hashtag
    const filteresPosts = getPostsWithHashtag(posts, hashtag.toString())
    setPostsWithHashtag(filteresPosts)
  }, [contract, hashtag, posts])

  const showFeedItems = postsWithHashtag.map((post) => (
    <FeedItem key={`post-${post.id}`} post={post} type='feed' parent />
  ))

  return (
    <>
      <Seo />
      {hashtag && (
        <div className={style.feedWrapper}>
          <div className={style.userHeaderWrapper}>
            <div className={style.userHeaderInner}>
              <div className={style.userHeaderTitle}>{hashtag ? `#${hashtag}` : '#undefined'}</div>
            </div>
          </div>
          {showFeedItems}
        </div>
      )}
    </>
  )
}

export default Space
