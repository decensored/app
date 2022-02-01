import { inBrowser } from 'lib/where'
import useStore, { STORE_VERSION } from 'lib/store'
import { dequeuePostsAndSpaces, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { LoadingProgressType, PostType } from 'lib/types'
import { getLatestPostIndex, getPostById } from 'api/feed'
import { limitArray } from './pollingUtils'

const INTERVAL = 4001 // (first prime over 4000) // 10 * 1000

const poll = async (): Promise<void> => {
  const state = useStore.getState()

  // TODO: this should be done somewhere else (in lib/store.ts?)
  if (typeof state.userId === 'string') {
    // console.log('convert userId to number')
    state.setUserId(parseInt(state.userId, 10))
    setTimeout(poll, 100) // quick retry
    return
  }

  // TODO: this should be done somewhere else (in lib/store.ts?)
  if (state.storeVersion !== STORE_VERSION) {
    // console.log('cacheFlush because of different store version')
    state.cacheFlush()
    setTimeout(poll, 100) // quick retry
    return
  }

  const contract: any = state?.contract
  if (!nodeIsUpAndRunning(contract)) {
    // console.log('polling_posts: waiting for node to be up and running')
    setTimeout(poll, 100) // quick retry until contract is available
    return
  }

  // start of actual functional code.

  // TODO: the rest should be refactored into reusable code

  limitArray(state.posts, state.setPosts, 'posts')
  limitArray(state.postsQueued, state.setPostsQueued, 'postsQueued')

  // console.log('polling_posts: check latest index')

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

    const postsLoaded: LoadingProgressType = {
      nFinished: 0,
      max: latestPostIndex - state.latestPostIndexFetched,
    }
    state.setPostsLoaded(postsLoaded)

    const postsPromises: Promise<PostType>[] = []
    for (let i = latestPostIndex; i > state.latestPostIndexFetched; i -= 1) {
      const p = getPostById(contract, i).then((result) => {
        postsLoaded.nFinished += 1
        // console.log(postsLoaded.nFinished, 'posts')
        state.setPostsLoaded(postsLoaded)
        return result
      })
      postsPromises.push(p)
    }
    const newPosts = await Promise.all(postsPromises)
    state.setPostsLoaded({ nFinished: 0, max: 0 })

    // store newPosts
    if (state.isPolledDataQueued && state.posts.length) {
      const allPostsQueued = newPosts.concat(state.postsQueued)
      state.setPostsQueued(allPostsQueued)

      // console.log(typeof state.userId, state.userId, allPostsQueued)

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
  } // end of latestPostIndex > state.latestPostIndexFetched

  // end of actual functional code

  setTimeout(poll, INTERVAL)
} // end of poll()

if (inBrowser) poll() // start your engines */
