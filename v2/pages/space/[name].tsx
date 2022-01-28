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

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  const { spaces, posts, isSignedUp, contract } = useStore((state) => ({
    spaces: state.spaces,
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    contract: state.contract,
  }))

  const [space, setSpace] = React.useState<SpaceType>()
  const [spacePosts, setSpacePosts] = React.useState<PostType[]>([])

  React.useEffect(() => {
    if (!(contract as any).accounts || !name || !spaces.length) return

    const spaceId = getSpaceIdByName(spaces, name as string)
    const currentSpace = getSpaceById(spaces, spaceId)
    setSpace(currentSpace)

    const postsForSpace = getPostsInSpace(posts, currentSpace)
    setSpacePosts(postsForSpace)
  }, [contract, name, posts, spaces])

  const showFeedItems = spacePosts.map((post) => (
    <FeedItem key={post.id} type='space' {...post} />
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
                  {/* { <img className='h-12 w-12 rounded-full ring-2 ring-white center' src={space!.img} alt=''/>} */}
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
              {isSignedUp && <PostForm spaceId={space.id} />}
              {showFeedItems}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default Space
