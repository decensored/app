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
import SVGIcon from 'components/Icon/SVGIcon'
import { userBlackListedForSpace } from 'api/spaces'
import SpaceSettingsDialog from 'components/Dialog/SpaceSettingsDialog'
import cuid from 'cuid'

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
  const [nrOfPosts, setNrOfPosts] = React.useState(0)
  const [nrOfUSers, setNrOfUsers] = React.useState(0)
  const [userIsBlacklisted, setUserIsBlacklisted] = React.useState(false)
  const [blackListArray, setBlackListArray] = React.useState<BlackListType[]>(
    []
  )

  /*   setBlackListArray([]) */

  React.useEffect(() => {
    if (!nodeIsUpAndRunning(contract) || !name || !spaces.length) return

    // Get information for Space
    const spaceId = getSpaceIdByName(spaces, name as string)
    const currentSpace = getSpaceById(spaces, spaceId)
    setSpace(currentSpace)

    // Get Posts for Space
    const postsForSpace = getPostsInSpace(posts, currentSpace)
    setSpacePosts(postsForSpace)
    setNrOfPosts(postsForSpace.length)

    // Check if current user is the owner so he can perform actions
    if (currentUserId === currentSpace.owner) {
      setSpaceOwner(true)
    }

    const uniqueUserIds = [
      ...new Map(
        postsForSpace.map((post) => [post.username, post.author])
      ).values(),
    ]
    setNrOfUsers(uniqueUserIds.length)

    // Get unqique users with post in space
    const uniqueUsers = [
      ...new Map(
        postsForSpace.map((post) => [
          post.username,
          { userId: post.author, username: post.username },
        ])
      ).values(),
    ]

    // Create an array of blacklisted users for the moderator
    const newBlacklist: { userId: number; username: string }[] = []
    uniqueUsers.forEach(async (user) => {
      const isUserBlacklisted = await userBlackListedForSpace(
        contract,
        spaceId,
        user.userId
      )
      if (isUserBlacklisted) {
        newBlacklist.push(user)
        // Check if current user is blacklisted to hide post-form
        if (user.userId === currentUserId) {
          setUserIsBlacklisted(true)
        }
      }
    })
    setBlackListArray(newBlacklist)
  }, [contract, name, posts, spaces, currentUserId, userIsBlacklisted])

  // Create Feediteams and check if user of post is blacklisted
  const showFeedItems = spacePosts.map((post) => {
    const userBlacklisted =
      blackListArray.filter((user) => user.userId === post.author).length > 0
    return (
      <FeedItem
        key={cuid()}
        type='space'
        moderator={spaceOwner}
        blacklist={blackListArray}
        userBlacklisted={userBlacklisted}
        {...post}
      />
    )
  })

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
                        space={space.id}
                        name={space.name}
                        blacklistedUsers={blackListArray}
                        setBlacklist={setBlackListArray}
                      />
                      <SVGIcon
                        icon='faCog'
                        className='top-0 left-0 text-white cursor-pointer'
                        onClick={() => {
                          setIsOpenSpaceSettingsDialog(true)
                        }}
                      />
                    </>
                  )}
                  <div className={classNamesLib.spaceHeaderTitle}>
                    {space.name ? `#${space.name}` : '#undefined'}
                  </div>
                  <div className={classNamesLib.spaceHeaderColsWrapper}>
                    <div className={classNamesLib.spaceHeaderColWrapper}>
                      <span className={classNamesLib.spaceHeaderColTitle}>
                        {nrOfPosts}
                      </span>
                      <span className={classNamesLib.spaceHeaderColText}>
                        Posts
                      </span>
                    </div>
                    <div className={classNamesLib.spaceHeaderColWrapper}>
                      <span className={classNamesLib.spaceHeaderColTitle}>
                        {nrOfUSers}
                      </span>
                      <span className={classNamesLib.spaceHeaderColText}>
                        Followers
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
