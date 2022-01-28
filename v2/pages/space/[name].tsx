import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getPostsInSpace, getSpaceById, getSpaceIdByName } from 'lib/storeUtils'
import type { PostType, SpaceType } from 'lib/types'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import PostForm from 'components/Post/PostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { userBlackListedForSpace } from 'api/spaces'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  // State Management
  const { spaces, posts, isSignedUp, userId, contract } = useStore((state) => ({
    spaces: state.spaces,
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    userId: state.userId,
    contract: state.contract,
  }))
  const [spaceOwner, setSpaceOwner] = React.useState(false)
  const [userIsBlacklisted, setUserIsBlacklisted] = React.useState(false)
  const [space, setSpace] = React.useState<SpaceType>()
  const [spacePosts, setSpacePosts] = React.useState<PostType[]>([])

  React.useEffect(() => {
    if (!(contract as any).accounts || !name || !spaces.length) return

    // Get information for Space
    const spaceId = getSpaceIdByName(spaces, name as string)
    const currentSpace = getSpaceById(spaces, spaceId)
    setSpace(currentSpace)

    // Get Posts for Space
    const postsForSpace = getPostsInSpace(posts, currentSpace)
    setSpacePosts(postsForSpace)

    // Check if current user is the owner so he can perform actions
    if (userId === currentSpace.owner) {
      setSpaceOwner(true)
    }

    // Check if user is blacklisted for space
    const checkUserBlacklist = async (): Promise<void> => {
      const isUserBlacklisted = await userBlackListedForSpace(
        contract,
        spaceId,
        userId
      )
      if (isUserBlacklisted) {
        setUserIsBlacklisted(true)
      }
    }
    checkUserBlacklist()
  }, [contract, name, posts, spaces, userIsBlacklisted, userId])

  const showFeedItems = spacePosts.map((post) => (
    <FeedItem key={post.id} type='space' owner={spaceOwner} {...post} />
  ))

  /*   return (
    <>
      <Header />
      <div className={classNamesLib.container}>
        {space && (
          <div className={classNamesLib.feedWrapper}>
            <div className={classNamesLib.spaceHeaderWrapper}>
              <div className={classNamesLib.spaceHeaderInner}>
                {spaceOwner && (
                  <FontAwesomeIcon
                    icon={faCog}
                    className='top-0 left-0 text-white cursor-pointer'
                  />
                )}
                <div className={classNamesLib.spaceHeaderTitle}>
                  {space.name ? `#${space.name}` : '#undefined'}
                </div>
                <div className={classNamesLib.spaceHeaderColsWrapper}>
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
                  <div className={classNamesLib.spaceHeaderColsWrapper}>
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
                  </div>
                </div>
              </div>
            </div>
            <div className={classNamesLib.feedPostsWrapper}>
              {isSignedUp && !userIsBlacklisted && (
                <PostForm spaceId={space.id} />
              )}
              {showFeedItems}
            </div>
          </div>
        )}
      </div>
    </>
  ) */

  return (
    <>
      <Header />
      <div className={classNamesLib.bodyContainer}>
        <div className={classNamesLib.bodyContainerCol1}>
          <AsideNavigation />
        </div>
        <div className={classNamesLib.bodyContainerCol2}>
          {space && (
            <div className={classNamesLib.feedWrapper}>
              <div className={classNamesLib.spaceHeaderWrapper}>
                <div className={classNamesLib.spaceHeaderInner}>
                  {spaceOwner && (
                    <FontAwesomeIcon
                      icon={faCog}
                      className='top-0 left-0 text-white cursor-pointer'
                    />
                  )}
                  <div className={classNamesLib.spaceHeaderTitle}>
                    {space.name ? `#${space.name}` : '#undefined'}
                  </div>
                  <div className={classNamesLib.spaceHeaderColsWrapper}>
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
                  </div>
                </div>
              </div>
              {isSignedUp && !userIsBlacklisted && (
                <PostForm spaceId={space.id} />
              )}
              {showFeedItems}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Space
