import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import type { PostType } from 'lib/types'
import { getLatestPostIndex, getPostById } from 'api/feed'

const INTERVAL = 15 * 1000

const poll = async (): Promise<void> => {
  const state = useStore.getState()

  const contract: any = state?.contract
  if (!contract.accounts) {
    setTimeout(poll, 100) // quick retry until contract is available
    return
  }

  const latestPostIndex = await getLatestPostIndex(state.contract)

  if (latestPostIndex > state.latestPostIndexFetched) {
    console.log(latestPostIndex - state.latestPostIndexFetched, 'NEW POSTS')

    const postsPromises: Promise<PostType>[] = []
    for (let i = latestPostIndex; i > state.latestPostIndexFetched; i -= 1) {
      const p = getPostById(contract, i)
      postsPromises.push(p)
    }
    const posts = await Promise.all(postsPromises)

    // Set new index & push new spaces into possibly existing array
    state.setLatestPostIndexFeched(latestPostIndex)
    state.posts.map((post) => posts.push(post))
    state.setPosts(posts)

    setTimeout(poll, INTERVAL)
  }
} // end of poll()

if (inBrowser) poll() // start your engines */
