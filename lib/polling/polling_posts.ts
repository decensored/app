import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import { dequeuePostsAndSpaces, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { PostType } from 'lib/types'
import { getLatestPostIndex, getPostById } from 'api/feed'

const INTERVAL = 10 * 1000

/* export */ const poll = async (): Promise<void> => {
  // console.log('polling_posts')
  const state = useStore.getState()

  const contract: any = state?.contract
  if (!nodeIsUpAndRunning(contract)) {
    setTimeout(poll, 100) // quick retry until contract is available
    return
  }

  const latestPostIndex = await getLatestPostIndex(state.contract)
  // console.log('no. posts', state.latestPostIndexFetched, '->', latestPostIndex)

  if (latestPostIndex < state.latestPostIndexFetched) {
    // console.log('reset posts')
    state.setLatestPostIndexFeched(0)
    state.setPosts([])
    state.setPostsQueued([])
  } else if (latestPostIndex > state.latestPostIndexFetched) {
    // Set new index & prepend new posts
    state.setLatestPostIndexFeched(latestPostIndex)

    // console.log(
    //   'new posts exist',
    //   latestPostIndex - state.latestPostIndexFetched
    // )

    const postsPromises: Promise<PostType>[] = []
    for (let i = latestPostIndex; i > state.latestPostIndexFetched; i -= 1) {
      const p = getPostById(contract, i)
      postsPromises.push(p)
    }
    const newPosts = await Promise.all(postsPromises)

    // store newPosts
    if (state.isPolledDataQueued && state.posts.length) {
      const allPostsQueued = newPosts.concat(state.postsQueued)
      state.setPostsQueued(allPostsQueued)

      // auto-deque when I'm the author of at least one queued post
      if (
        allPostsQueued.findIndex((post) => post.author === state.userId) >= 0
      ) {
        dequeuePostsAndSpaces()
      }
    } else {
      const allPosts = newPosts.concat(state.posts)
      state.setPosts(allPosts)
    }
  }

  setTimeout(poll, INTERVAL)
} // end of poll()

if (inBrowser) poll() // start your engines */
