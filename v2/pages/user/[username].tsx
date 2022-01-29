import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getPostsForUser, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { PostType } from 'lib/types'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import cuid from 'cuid'

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

    // Check if current user is the owner so he can perform actions
    /*     if (currentUserId === 13) {
      setProfileOwner(true)
    } */
  }, [contract, username, posts, currentUserId])

  const showFeedItems = userPosts.map((post) => (
    <FeedItem key={cuid()} type='feed' {...post} />
  ))

  return (
    <>
      <Header />
      <div className={classNamesLib.bodyContainer}>
        <div className={classNamesLib.bodyContainerCol1}>
          <AsideNavigation />
        </div>
        <div className={classNamesLib.bodyContainerCol2}>
          <div className={classNamesLib.feedWrapper}>
            <div className={classNamesLib.spaceHeaderWrapper}>
              <div className={classNamesLib.spaceHeaderInner}>
                <div className={classNamesLib.spaceHeaderTitle}>
                  {username ? `#${username}` : '#undefined'}
                </div>
                {/*                 <div className={classNamesLib.spaceHeaderColsWrapper}>
                  <div className={classNamesLib.spaceHeaderColWrapper}>
                    <span className={classNamesLib.spaceHeaderColTitle}>
                      {space.posts}
                    </span>
                    <span className={classNamesLib.spaceHeaderColText}>
                      Posts
                    </span>
                  </div>
                  <div className={classNamesLib.spaceHeaderColWrapper}>
                    <span className={classNamesLib.spaceHeaderColTitle}>
                      {space.followers}
                    </span>
                    <span className={classNamesLib.spaceHeaderColText}>
                      Followers
                    </span>
                  </div>
                  <div className={classNamesLib.spaceHeaderColWrapper}>
                    <span className={classNamesLib.spaceHeaderColTitle}>
                      {space.whatever}
                    </span>
                    <span className={classNamesLib.spaceHeaderColText}>
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
    </>
  )
}

export default Space
