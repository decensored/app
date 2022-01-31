import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import { dequeuePostsAndSpaces, nodeIsUpAndRunning } from 'lib/storeUtils'
import type { SpaceType } from 'lib/types'
import { getSpaceById } from 'api/spaces'

const INTERVAL = 10 * 1000

const poll = async (): Promise<void> => {
  const state = useStore.getState()

  const contract: any = state?.contract
  if (!nodeIsUpAndRunning(contract)) {
    setTimeout(poll, 100) // quick retry until contract is available
    return
  }

  const latestSpaceIndex = parseInt(
    await contract.spaces.methods.get_latest_space_index().call(),
    10
  )
  // console.log(
  //   'no. spaces',
  //   state.latestSpaceIndexFetched,
  //   '->',
  //   latestSpaceIndex
  // )

  if (latestSpaceIndex < state.latestSpaceIndexFetched) {
    // console.log('reset spaces')
    state.setLatestSpaceIndexFetched(0)
    state.setSpaces([])
    state.setSpacesQueued([])
  } else if (latestSpaceIndex > state.latestSpaceIndexFetched) {
    // Set new index & prepend new posts
    state.setLatestSpaceIndexFetched(latestSpaceIndex)

    // console.log('new spaces exist', latestSpaceIndex - state.latestSpaceIndexFetched)

    const spacesPromises: Promise<SpaceType>[] = []
    for (let i = latestSpaceIndex; i > state.latestSpaceIndexFetched; i -= 1) {
      const p = getSpaceById(contract, i)
      spacesPromises.push(p)
    }
    const newSpaces = await Promise.all(spacesPromises)

    // store newSpaces
    if (state.isPolledDataQueued && state.spaces.length) {
      const allSpacesQueued = newSpaces.concat(state.spacesQueued)
      state.setSpacesQueued(allSpacesQueued)

      // auto-deque when I'm the author of at least one queued post
      if (
        allSpacesQueued.findIndex((space) => space.owner === state.userId) >= 0
      ) {
        dequeuePostsAndSpaces()
      }
    } else {
      const allSpaces = newSpaces.concat(state.spaces)
      state.setSpaces(allSpaces)
    }
  }

  setTimeout(poll, INTERVAL)
} // end of poll()

if (inBrowser) poll() // start your engines