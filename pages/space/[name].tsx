import React, { useState } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import {
  getPostsInSpace,
  getRepliesForPost,
  getSpaceById,
  getSpaceIdByName,
  nodeIsUpAndRunning,
} from 'lib/storeUtils'
import type { PostType, SpaceType, UserType } from 'lib/types'
import { style } from 'styles/style'
import PostForm from 'components/Post/PostForm'
import SVGIcon from 'components/Icon/SVGIcon'
import { userBlackListedForSpace } from 'api/spaces'
import SpaceSettingsDialog from 'components/Dialog/SpaceSettingsDialog'
import UserDialog from 'components/Dialog/UserDialog'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  // State Management
  const { spaces, posts, isSignedUp, currentUserId, contract } = useStore(
    (state) => ({
      spaces: state.spaces,
      posts: state.posts,
      isSignedUp: state.isSignedUp,
      currentUserId: state.userId,
      contract: state.contract,
    })
  )

  const [openSpaceSettingsDialog, setOpenSpaceSettingsDialog] = useState(false)
  const [openUserDialog, setOpenUserDialog] = useState(false)
  const [spaceOwner, setSpaceOwner] = React.useState(false)
  const [space, setSpace] = React.useState<SpaceType>()
  const [spacePosts, setSpacePosts] = React.useState<PostType[]>([])
  const [nrOfPosts, setNrOfPosts] = React.useState(0)
  const [nrOfUSers, setNrOfUsers] = React.useState(0)
  const [userArray, setUserArray] = React.useState<UserType[]>([])
  const [currentUserBlacklisted, setCurrentUserIsBlacklisted] =
    React.useState(false)
  const [blackListArray, setBlackListArray] = React.useState<UserType[]>([])

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

    // Get unqique users with post in space
    const uniqueUsers = [
      ...new Map(
        postsForSpace.map((post) => [
          post.username,
          { userId: post.author, username: post.username },
        ])
      ).values(),
    ]
    setNrOfUsers(uniqueUsers.length)
    setUserArray(uniqueUsers)

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
          setCurrentUserIsBlacklisted(true)
        }
      }
    })
    setBlackListArray(newBlacklist)
  }, [contract, name, posts, spaces, currentUserId, currentUserBlacklisted])

  // Create Feediteams and check if user of post is blacklisted
  const showFeedItems = spacePosts.map((post) => {
    if (post.mother_post !== 0) return null // early exit

    // Get Replies for Post
    const repliesForPost = getRepliesForPost(posts, post.id)

    // Check if the author is blacklisted
    const authorIsBlacklisted =
      blackListArray.filter((user) => user.userId === post.author).length > 0

    return (
      <FeedItem
        key={`post-${post.id}`}
        moderator={spaceOwner}
        blacklist={blackListArray}
        authorIsBlacklisted={authorIsBlacklisted}
        replies={repliesForPost}
        {...post}
        type='space'
        parent
      />
    )
  })

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1} hide-on-mobile`}>
          <AsideNavigation />
        </div>
        <div className={style.bodyContainerCol2}>
          {space && (
            <div className={style.feedWrapper}>
              <div className={style.spaceHeaderWrapper}>
                  {spaceOwner && (
                    <>
                      <SVGIcon
                        icon='faCog'
                        className='fixed top-0 right-0 text-white cursor-pointer'
                        onClick={() => setOpenSpaceSettingsDialog(true)}
                      />
                      <SpaceSettingsDialog
                        space={space.id}
                        name={space.name}
                        blacklistedUsers={blackListArray}
                        setBlacklist={setBlackListArray}
                        showDialog={openSpaceSettingsDialog}
                        onClose={() => setOpenSpaceSettingsDialog(false)}
                      />
                    </>
                  )}
                <div className={style.spaceHeaderInner}>
                  <div className={style.spaceHeaderInnerCol1}>
                      <div className={style.spaceHeaderTitle}>
                        #{name}
                      </div>
                      <div className={style.spaceHeaderDescription}>
                        {space.description}
                      </div>
                  </div>
                  <div className={style.spaceHeaderInnerCol2}>
                    {' '}
                    <div className={style.spaceHeaderDataWrapper}>
                      <div className={style.spaceHeaderDataCol}>
                        <span className={style.spaceHeaderDataTitle}>
                          {nrOfPosts}
                        </span>
                        <span className={style.spaceHeaderDataText}>
                          Posts
                        </span>
                      </div>
                      <div className={style.spaceHeaderDataCol}>
                        <button
                          type='button'
                          onClick={() => {
                            setOpenUserDialog(true)
                          }}
                          className={style.spaceHeaderDataTitle}
                        >
                          {nrOfUSers}
                        </button>
                        <span className={style.spaceHeaderDataText}>
                          Followers
                        </span>
                        <UserDialog
                          users={userArray}
                          showDialog={openUserDialog}
                          onClose={() => setOpenUserDialog(false)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {isSignedUp && !currentUserBlacklisted && (
                <div
                  className={`${style.feedItemWrapper} ${style.feedItemWrapperDark} ${style.feedItemParent}`}
                >
                  <div className={style.feedItemInner}>
                    <PostForm spaceId={space.id} isTransparent />
                  </div>
                </div>
              )}
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
