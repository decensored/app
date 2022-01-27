import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import type { PostType, SpaceType } from 'lib/types'
import { getSpaceByName } from 'api/spaces'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import PostForm from 'components/Post/PostForm'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query

  const { posts, isSignedUp, contract } = useStore((state) => ({
    posts: state.posts,
    isSignedUp: state.isSignedUp,
    contract: state.contract,
  }))

  // TODO: refactor to just computer the space and spacePosts from what we have in the store
  //       no need for doing extra calls to the smartcontract.

  // GET DATA FOR SPACE
  const [space, setSpace] = React.useState<SpaceType>()

  const [spacePosts, setSpacePosts] = React.useState<PostType[]>([])

  React.useEffect(() => {
    if (!(contract as any).accounts || !name) return

    getSpaceByName(contract, name as string).then(async (result) => {
      setSpace(result)
      const postsForSpace = posts.filter((post) => post.space === result.id)
      setSpacePosts(postsForSpace)
    })
  }, [contract, name, posts])

  const showFeedItems = spacePosts.map((post) => (
    <FeedItem key={post.id} type='space' {...post} />
  ))

  return (
    <>
      <Header />
      <div className={classNamesLib.container}>
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
            <div className={classNamesLib.feedPostsWrapper}>
              {isSignedUp && <PostForm spaceId={space.id} />}
              {showFeedItems}
            </div>
          </div>
        )}
      </div>
      <Bottombar />
    </>
  )
}

export default Space
