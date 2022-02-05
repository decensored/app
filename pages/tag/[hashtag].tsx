import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getPostsWithHashtag, getRepliesForPost, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { PostType } from 'lib/types'
import { style } from 'styles/style'

const Space: NextPage = () => {
  const router = useRouter()
  const { hashtag } = router.query

  // State Management
  const { spaces, posts, contract } = useStore((state) => ({
    spaces: state.spaces,
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    contract: state.contract,
  }))

  const [postsWithHashtag, setPostsWithHashtag] = React.useState<PostType[]>([])

  /*   setBlackListArray([]) */

  React.useEffect(() => {
    if (!nodeIsUpAndRunning(contract) || !hashtag || !spaces.length) return

    // Get Posts for Space
    const filteresPosts = getPostsWithHashtag(posts, hashtag.toString())
    setPostsWithHashtag(filteresPosts)
  }, [contract, hashtag, posts, spaces.length])

  // Create Feediteams and check if user of post is blacklisted
  const showFeedItems = postsWithHashtag.map((post) => {
    /*     if (post.mother_post !== 0) return null // early exit */

    // Get Replies for Post
    const repliesForPost = getRepliesForPost(posts, post.id)

    return <FeedItem key={`post-${post.id}`} replies={repliesForPost} post={post} type='feed' parent />
  })

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1} hide-on-mobile`}>
          <AsideNavigation />
        </div>
        <div className={style.bodyContainerCol2}>
          {hashtag && (
            <div className={style.feedWrapper}>
              <div className={style.spaceHeaderWrapper}>
                <div className={style.spaceHeaderInner}>
                  <div className={style.spaceHeaderInnerCol1}>
                    <div className={style.spaceHeaderTitle}>#{hashtag}</div>
                  </div>
                  <div className={style.spaceHeaderInnerCol2}>
                    <div className={style.spaceHeaderDataWrapper}>
                      <div className={style.spaceHeaderDataCol}>
                        <span className={style.spaceHeaderDataTitle}>{postsWithHashtag.length}</span>
                        <span className={style.spaceHeaderDataText}>Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {showFeedItems}
            </div>
          )}
        </div>
      </div>
      <div className='hide-on-desktop'>
        <BottomNavigation />
      </div>
    </>
  )
}

export default Space
