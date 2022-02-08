import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Scaffolding/Header'
import AsideNavigation from 'components/Navigation/AsideNavigation'
import BottomNavigation from 'components/Navigation/BottomNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getPostsInSpace, getSpaceById, getSpaceIdByName, getUserById, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { PostType, SpaceType, UserType } from 'lib/types'
import { style } from 'styles/style'
import PostForm from 'components/Post/PostForm'
import { userBlackListedForSpace } from 'api/spaces'
import SpaceHeader from 'components/Spaces/SpaceHeader'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  // State Management
  const { accounts, spaces, posts, isSignedUp, currentUserId, contract } = useStore((state) => ({
    accounts: state.accounts,
    spaces: state.spaces,
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    currentUserId: state.userId,
    contract: state.contract,
  }))

  const [spaceOwner, setSpaceOwner] = React.useState(false)
  const [spaceOwnerName, setSpaceOwnerName] = React.useState('')
  const [space, setSpace] = React.useState<SpaceType>()
  const [spacePosts, setSpacePosts] = React.useState<PostType[]>([])
  const [nrOfPosts, setNrOfPosts] = React.useState(0)
  const [nrOfUSers, setNrOfUsers] = React.useState(0)
  const [userArray, setUserArray] = React.useState<UserType[]>([])
  const [currentUserBlacklisted, setCurrentUserIsBlacklisted] = React.useState(false)
  const [blackListArray, setBlackListArray] = React.useState<UserType[]>([])

  /*   setBlackListArray([]) */

  React.useEffect(() => {
    if (!nodeIsUpAndRunning(contract) || !name || !spaces.length) return

    // Get information for Space
    const spaceId = getSpaceIdByName(spaces, name as string)
    const currentSpace = getSpaceById(spaces, spaceId)
    setSpace(currentSpace)

    const owner = getUserById(accounts, currentSpace.owner)
    setSpaceOwnerName(owner.username)

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
        postsForSpace.map((post) => [post.username, { userId: post.author, username: post.username }])
      ).values(),
    ]
    setNrOfUsers(uniqueUsers.length)
    setUserArray(uniqueUsers)

    // Create an array of blacklisted users for the moderator
    const newBlacklist: { userId: number; username: string }[] = []
    uniqueUsers.forEach(async (user) => {
      const isUserBlacklisted = await userBlackListedForSpace(contract, spaceId, user.userId)
      if (isUserBlacklisted) {
        newBlacklist.push(user)
        // Check if current user is blacklisted to hide post-form
        if (user.userId === currentUserId) {
          setCurrentUserIsBlacklisted(true)
        }
      }
    })
    setBlackListArray(newBlacklist)
  }, [contract, name, posts, spaces, currentUserId, currentUserBlacklisted, accounts, spaceOwnerName])

  // Create Feediteams and check if user of post is blacklisted
  const showFeedItems = spacePosts.map((post) => {
    if (post.mother_post !== 0) return null // early exit

    // Get Replies for Post
    // const repliesForPost = getRepliesForPost(posts, post.id)

    // Check if the author is blacklisted
    const authorIsBlacklisted = blackListArray.filter((user) => user.userId === post.author).length > 0

    return (
      <FeedItem
        key={`post-${post.id}`}
        moderator={spaceOwner}
        blacklist={blackListArray}
        authorIsBlacklisted={authorIsBlacklisted}
        post={post}
        type='space'
        parent
      />
    )
  })

  return (
    <>
      <Header />
      <div className={style.bodyContainer}>
        <div className={`${style.bodyContainerCol1}`}>
          <AsideNavigation />
        </div>
        <div className={style.bodyContainerCol2}>
          {space && (
            <div className={style.feedWrapper}>
              <SpaceHeader
                space={space}
                spaceOwner={spaceOwner}
                spaceOwnerName={spaceOwnerName}
                name={name}
                nrOfPosts={nrOfPosts}
                nrOfUSers={nrOfUSers}
                userArray={userArray}
                blackListArray={blackListArray}
                setBlackListArray={setBlackListArray}
              />
              {isSignedUp && !currentUserBlacklisted && (
                <div className={`${style.feedItemWrapper} ${style.feedItemWrapperDark} ${style.feedItemParent}`}>
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
      <BottomNavigation />
    </>
  )
}

export default Space
