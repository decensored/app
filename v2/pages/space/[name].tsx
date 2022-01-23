import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getSpaceByName } from 'api/spaces'
import { getAllPostsForSpace } from 'api/feed'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const Space: NextPage = () => {
  const router = useRouter()
  const { name } = router.query
  const { isSignedUp, contract } = useStore((state) => ({
    isSignedUp: state.isSignedUp,
    contract: state.contract,
  }))

  // GET DATA FOR SPACE
  const [space, setSpace] = React.useState<{
    id: number
    name: string
    owner: number
    followers: number
    posts: number
    whatever: number
    img: string
  }>()

  const [spacePosts, setSpacePosts] = React.useState<
    {
      id: number
      username: string
      message: string
      author: number
      timestamp: string
      space: number
      mother_post: number
    }[]
  >()

  React.useEffect(() => {
    getSpaceByName(contract, name as string).then(async (result) => {
      setSpace(result)
      const posts = await getAllPostsForSpace(contract, result.id)
      setSpacePosts(posts)
    })
  }, [contract, name])

  // CHECK IF DATA IS PRESENT AND CREATE FEEDITEMS
  if (!space || !spacePosts) {
    return null
  }
  let showFeedItems
  if (spacePosts.length > 0) {
    showFeedItems = spacePosts.map((post) => (
      <FeedItem key={post.id} {...post} />
    ))
  }

  return (
    <>
      <Header />
      <div className={classNamesLib.container}>
        <div className={classNamesLib.feedWrapper}>
          {isSignedUp && (
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
          )}
          <div className={classNamesLib.feedPostsWrapper}>{showFeedItems}</div>
        </div>
      </div>
      <Bottombar />
    </>
  )
}

export default Space
