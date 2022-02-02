import { inBrowser } from 'lib/where'
import useStore, { STORE_VERSION } from 'lib/store'
import { dequeuePostsAndSpaces, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { LoadingProgressType, PostType } from 'lib/types'
import { getLatestPostIndex, getPostById } from 'api/feed'
import { limitArray /* , pollingConfig */ } from './pollingUtils'

const INTERVAL = 4001 // (first prime over 4000) // 10 * 1000

// XXX these setTimout don't get cancelled during hot code reloading so useTimeout in the next refactor!

const updateStateWithNewPosts = (state: any, newPosts: PostType[]) => {
  // store newPosts
  if (state.isPolledDataQueued && state.posts.length) {
    const allPostsQueued = newPosts.concat(state.postsQueued)
    state.setPostsQueued(allPostsQueued)

    // console.log(typeof state.userId, state.userId, allPostsQueued)

    // auto-deque when I'm the author of at least one queued post
    if (allPostsQueued.findIndex((post) => post.author === state.userId) >= 0) {
      dequeuePostsAndSpaces()
    }
  } else {
    const allPosts = newPosts.concat(state.posts)
    state.setPosts(allPosts)
  }
} // end of updateStateWithNewPosts

//
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
    state.setLatestPostIndexFeched(latestPostIndex) // Set new index & prepend new posts

    console.log(`Loading ${latestPostIndex - state.latestPostIndexFetched} posts`)

    const postsLoaded: LoadingProgressType = {
      nFinished: 0,
      max: latestPostIndex - state.latestPostIndexFetched,
    }
    state.setPostsLoaded(postsLoaded)

    // console.log(pollingConfig)

    console.time('polling_posts Loading Batch')
    const postsPromises: Promise<PostType>[] = []
    for (let i = latestPostIndex; i > state.latestPostIndexFetched; i -= 1) {
      // console.log(`getPostById ${i}`)
      const p = getPostById(contract, i).then((result) => {
        postsLoaded.nFinished += 1
        // console.log(postsLoaded.nFinished, 'posts')
        state.setPostsLoaded(postsLoaded)
        return result
      })
      postsPromises.push(p)

      // if (postsPromises.length % pollingConfig.batchSize === 0 || i === state.latestPostIndexFetched + 1) {
      //   console.log(`process batch at ${postsPromises.length}`)
      //   const newPosts = await Promise.all(postsPromises)
      //   updateStateWithNewPosts(state, newPosts)
      //   postsPromises = []
      // }
    }
    const newPosts = await Promise.all(postsPromises)
    updateStateWithNewPosts(state, newPosts)
    console.timeEnd('polling_posts Loading Batch')

    state.setPostsLoaded({ nFinished: 0, max: 0 })
  } // end of latestPostIndex > state.latestPostIndexFetched

  // end of actual functional code

  setTimeout(poll, INTERVAL)
} // end of poll()

if (inBrowser) poll() // start your engines */
