/* eslint no-await-in-loop: "off" */ // because we process per batch instead of each

import useStore from 'lib/store'
import { dequeuePostsAndSpaces, orderByTimestamp } from 'lib/storeUtils'
import type { LoadingProgressType, PostType } from 'lib/types'
import { getLatestPostIndex, getPostById } from 'api/feed'
import { limitArray, pollingConfig, runPoller } from './pollingUtils'

const INTERVAL = 4001 // (first prime over 4000) // 10 * 1000

const updateStateWithNewPosts = (newPosts: PostType[]) => {
  const state = useStore.getState()

  if (state.isPolledDataQueued && state.posts.length) {
    state.setPostsQueued(orderByTimestamp(newPosts.concat(state.postsQueued)))

    // auto-deque when I'm the author of at least one queued post
    const newState = useStore.getState()
    if (newState.postsQueued.findIndex((post: PostType) => post.author === newState.userId) >= 0) {
      dequeuePostsAndSpaces()
    }
  } else {
    // console.log(
    //   `isPolledDataQueued=${state.isPolledDataQueued}, nPosts=${state.posts.length}, nNewPosts=${newPosts.length}`
    // )
    state.setPosts(orderByTimestamp(newPosts.concat(state.posts)))
  }
} // end of updateStateWithNewPosts

//
const pollPosts = async (state: any): Promise<void> => {
  limitArray(state.posts, state.setPosts, 'posts')
  limitArray(state.postsQueued, state.setPostsQueued, 'postsQueued')

  const contract: any = state?.contract
  const latestPostIndex = await getLatestPostIndex(state.contract)

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

    console.time('Loading Posts')
    let postsPromises: Promise<PostType>[] = []
    for (let i = latestPostIndex; i > state.latestPostIndexFetched; i -= 1) {
      // console.log(`getPostById ${i}`)
      const p = getPostById(contract, i).then((result) => {
        postsLoaded.nFinished += 1
        // console.log(postsLoaded.nFinished, 'posts')
        state.setPostsLoaded(postsLoaded)
        return result
      })
      postsPromises.push(p)

      if (postsPromises.length % pollingConfig.batchSize === 0 || i === state.latestPostIndexFetched + 1) {
        // console.log(`process batch of ${postsPromises.length} at index ${i}`)
        const newPosts = await Promise.all(postsPromises)
        updateStateWithNewPosts(newPosts)
        postsPromises = []
      }
    }
    console.timeEnd('Loading Posts')

    state.setPostsLoaded({ nFinished: 0, max: 0 })
  } // end of latestPostIndex > state.latestPostIndexFetched
} // end of pollPosts

runPoller(pollPosts, INTERVAL)
