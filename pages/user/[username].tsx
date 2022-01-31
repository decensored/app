import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import { BrowserView, MobileView } from 'react-device-detect'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import {
  getPostsForUser,
  getRepliesForPost,
  nodeIsUpAndRunning,
} from 'lib/storeUtils'
import type { PostType } from 'lib/types'
import { style } from 'styles/style'

const Space: NextPage = () => {
  const router = useRouter()
  const { username } = router.query

  // State Management
  const { posts, currentUserId, contract } = useStore((state) => ({
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    currentUserId: state.userId,
    contract: state.contract,
  }))

  /*   const [setProfileOwner] = React.useState(false) */
  const [userPosts, setUserPosts] = React.useState<PostType[]>([])
  /*   setBlackListArray([]) */

  React.useEffect(() => {
    if (!nodeIsUpAndRunning(contract) || !username) return

    // Get Posts for Space
    const postsForUser = getPostsForUser(posts, username as string)
    setUserPosts(postsForUser)
  }, [contract, username, posts, currentUserId])

  const showFeedItems = userPosts.map((post) => {
    const repliesForPost = getRepliesForPost(posts, post.id)
    if (post.mother_post === 0) {
      return (
        <FeedItem
          key={post.timestamp}
          type='feed'
          parent
          replies={repliesForPost}
          {...post}
        />
      )
    }
    return null
  })

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <BrowserView className={style.bodyContainerCol1}>
          <AsideNavigation />
        </BrowserView>
        <div className={style.bodyContainerCol2}>
          <div className={style.feedWrapper}>
            <div className={style.spaceHeaderWrapper}>
              <div className={style.spaceHeaderInner}>
                <div className={style.spaceHeaderTitle}>
                  {username ? `#${username}` : '#undefined'}
                </div>
                {/*                 <div className={style.spaceHeaderColsWrapper}>
                  <div className={style.spaceHeaderColWrapper}>
                    <span className={style.spaceHeaderColTitle}>
                      {space.posts}
                    </span>
                    <span className={style.spaceHeaderColText}>
                      Posts
                    </span>
                  </div>
                  <div className={style.spaceHeaderColWrapper}>
                    <span className={style.spaceHeaderColTitle}>
                      {space.followers}
                    </span>
                    <span className={style.spaceHeaderColText}>
                      Followers
                    </span>
                  </div>
                  <div className={style.spaceHeaderColWrapper}>
                    <span className={style.spaceHeaderColTitle}>
                      {space.whatever}
                    </span>
                    <span className={style.spaceHeaderColText}>
                      Whatever
                    </span>
                  </div>
                </div> */}
              </div>
            </div>
            {showFeedItems}
          </div>
        </div>
      </div>
      <MobileView>
        <BottomNavigation />
      </MobileView>
    </>
  )
}

export default Space
