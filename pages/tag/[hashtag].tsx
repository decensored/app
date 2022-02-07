import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Scaffolding/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getPostsWithHashtag, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { PostType } from 'lib/types'
import { style } from 'styles/style'

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
      <Header />
      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1}`}>
          <AsideNavigation />
        </div>
        <div className={style.bodyContainerCol2}>
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
        </div>
      </div>
      <BottomNavigation />
    </>
  )
}

export default Space
