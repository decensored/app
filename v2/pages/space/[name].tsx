import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import {
  getPostsInSpace,
  getSpaceById,
  getSpaceIdByName,
  nodeIsUpAndRunning,
} from 'lib/storeUtils'
import type { BlackListType, PostType, SpaceType } from 'lib/types'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import PostForm from 'components/Post/PostForm'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { userBlackListedForSpace } from 'api/spaces'
import SpaceSettingsDialog from 'components/Dialog/SpaceSettingsDialog'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  // State Management
  const {
    spaces,
    posts,
    isSignedUp,
    currentUserId,
    contract,
    setIsOpenSpaceSettingsDialog,
  } = useStore((state) => ({
    spaces: state.spaces,
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    currentUserId: state.userId,
    contract: state.contract,
    setIsOpenSpaceSettingsDialog: state.setIsOpenSpaceSettingsDialog,
  }))

  const [spaceOwner, setSpaceOwner] = React.useState(false)
  const [space, setSpace] = React.useState<SpaceType>()
  const [spacePosts, setSpacePosts] = React.useState<PostType[]>([])
  const [userIsBlacklisted, setUserIsBlacklisted] = React.useState(false)
  const [blackListArray, setBlackListArray] = React.useState<BlackListType[]>(
    []
  )

  React.useEffect(() => {
    if (!nodeIsUpAndRunning(contract) || !name || !spaces.length) return

    // Get information for Space
    const spaceId = getSpaceIdByName(spaces, name as string)
    const currentSpace = getSpaceById(spaces, spaceId)
    setSpace(currentSpace)

    // Get Posts for Space
    const postsForSpace = getPostsInSpace(posts, currentSpace)
    setSpacePosts(postsForSpace)

    // Check if current user is the owner so he can perform actions
    if (currentUserId === currentSpace.owner) {
      setSpaceOwner(true)
    }

    // Create an array of blacklisted users for the moderator
    const uniqueAuthorIds = postsForSpace.map((post) => ({
      userId: post.author,
      username: post.username,
    }))
    uniqueAuthorIds.forEach(async (author) => {
      const isUserBlacklisted = await userBlackListedForSpace(
        contract,
        spaceId,
        author.userId
      )
      if (isUserBlacklisted) {
        const user = {
          userId: author.userId,
          username: author.username,
        }
        blackListArray.push(user)
        // Check if current user is blacklisted to hide post-form
        if (author.userId === currentUserId) {
          setUserIsBlacklisted(true)
        }
      }
    })
  }, [
    contract,
    name,
    posts,
    spaces,
    currentUserId,
    blackListArray,
    userIsBlacklisted,
  ])

  const showFeedItems = spacePosts.map((post) => (
    <FeedItem
      key={post.id}
      type='space'
      moderator={spaceOwner}
      blacklist={blackListArray}
      setBlacklist={setBlackListArray}
      {...post}
    />
  ))

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
                    <>
                      <SpaceSettingsDialog
                        name={space.name}
                        blacklistedUsers={blackListArray}
                      />
                      <FontAwesomeIcon
                        icon={faCog}
                        onClick={() => {
                          setIsOpenSpaceSettingsDialog(true)
                        }}
                        className='top-0 left-0 text-white cursor-pointer'
                      />
                    </>
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
