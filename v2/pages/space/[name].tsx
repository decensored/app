import React from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import Header from 'components/Header/Header'
import Bottombar from 'components/BottomNavigation/BottomNavigation'
import FeedItem from 'components/Feed/FeedItem'
import useStore from 'lib/store'
import { getSpaceByName } from 'api/spaces'
import { getAllPostsForSpace } from 'api/feed'

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
      {isSignedUp && (
        <div className='bg-decensored-gradient w-full flex flex-col h-40 items-center pt-3 top-0 sticky'>
          <div className='flex font-extrabold text-xl text-white italic justify-evenly align-middle bg-img'>
            <div>
              {/*     {
                <img
                  className='h-12 w-12 rounded-full ring-2 ring-white center'
                  src={space!.img}
                  alt=''
                />
              } */}
            </div>
            <div className='place-self-center px-5'>
              <h1>{space.name ? `# ${space.name}` : '#undefined'}</h1>
            </div>
          </div>
          <div className='flex w-full mx-auto justify-evenly text-white py-4 text-lg text-center'>
            <div className='flex flex-col'>
              <span className='text-s mt-2 font-bold'>{space.posts}</span>
              <span className='text-xs'>Posts</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-s mt-2 font-bold'>{space.followers}</span>
              <span className='text-xs'>Followers</span>
            </div>
            <div className='flex flex-col'>
              <span className='text-s mt-2 font-bold'>{space.whatever}</span>
              <span className='text-xs'>Whatever</span>
            </div>
          </div>
        </div>
      )}
      <div className='container mx-auto py-10 px-3 max-w-md flex flex-col gap-y-5 mb-28'>
        <div id='posts' className='flex flex-col gap-y-5 mb-28'>
          {showFeedItems}
        </div>
      </div>
      <Bottombar />
    </>
  )
}

export default Space
