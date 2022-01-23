import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import { PostType } from 'api/types'
import { getPostById } from 'api/feed'

const INTERVAL = 10 * 1000

const PostsPoll = async (): Promise<void> => {
  const {
    latestPostIndexFetched,
    setLatestPostIndexFetched,
    existingPosts,
  } = useStore((state) => ({
    latestPostIndexFetched: state.latestPostIndexFetched,
    setLatestPostIndexFetched: state.setLatestPostIndexFeched,
    existingPosts: state.posts,
  }))

  const state = useStore.getState()
  const contract: any = state?.contract
  if (!contract.accounts) {
    setTimeout(PostsPoll, 100) // quick retry until contract is available
    return
  }

  const latestPostIndex = await await contract.posts.methods
  .get_amount_of_posts()
  .call()
  .then(parseInt)

  if(latestPostIndex > latestPostIndexFetched) {
    const postsPromises: Promise<PostType>[] = []
    for (let i = latestPostIndex; i >= latestPostIndexFetched; i -= 1) {
      const p = getPostById(contract, i)
      postsPromises.push(p)
    }
    const posts = await Promise.all(postsPromises)
    state.setPosts(posts)

    // Set new index & push new posts into possibly existing array
    setLatestPostIndexFetched(latestPostIndex)
    existingPosts.map(post => posts.push(post))
    state.setPosts(posts)
  }

  setTimeout(PostsPoll, INTERVAL)
} // end of poll()

if (inBrowser) PostsPoll() // start your engines
