import { dequeuePostsAndSpaces } from 'lib/storeUtils'
import type { LoadingProgressType, SpaceType } from 'lib/types'
import { getSpaceById } from 'api/spaces'
import { limitArray, /* pollingConfig, */ runPoller } from './pollingUtils'

const INTERVAL = 5003 // (first prime over 5000) // 10 * 1000

const pollSpaces = async (state: any): Promise<void> => {
  limitArray(state.spaces, state.setSpaces, 'spaces')
  limitArray(state.spacesQueued, state.setSpacesQueued, 'spacesQueued')

  const contract: any = state?.contract
  const latestSpaceIndex = parseInt(await contract.spaces.methods.get_amount_of_spaces().call(), 10)
  if (latestSpaceIndex <= state.latestSpaceIndexFetched) return

  state.setLatestSpaceIndexFetched(latestSpaceIndex)

  const nToLoad = latestSpaceIndex - state.latestSpaceIndexFetched
  // Math.min(latestSpaceIndex - state.latestSpaceIndexFetched, pollingConfig.lowWater)
  console.log(`Loading ${nToLoad} spaces`)

  const spacesLoaded: LoadingProgressType = {
    nFinished: 0,
    max: nToLoad,
  }
  state.setSpacesLoaded(spacesLoaded)

  console.time('Loading Spaces')
  const spacesPromises: Promise<SpaceType>[] = []
  for (let i = latestSpaceIndex; i > latestSpaceIndex - nToLoad; i -= 1) {
    const p = getSpaceById(contract, i).then((result) => {
      spacesLoaded.nFinished += 1
      // console.log(spacesLoaded.nFinished, 'spaces')
      state.setSpacesLoaded(spacesLoaded)
      return result
    })
    spacesPromises.push(p)
  }
  const newSpaces = await Promise.all(spacesPromises)
  console.timeEnd('Loading Spaces')

  state.setSpacesLoaded({ nFinished: 0, max: 0 })

  // store newSpaces
  if (state.isPolledDataQueued && state.spaces.length) {
    const allSpacesQueued = newSpaces.concat(state.spacesQueued)
    state.setSpacesQueued(allSpacesQueued)

    // auto-deque when I'm the author of at least one queued post
    if (allSpacesQueued.findIndex((space) => space.owner === state.userId) >= 0) {
      dequeuePostsAndSpaces()
    }
  } else {
    const allSpaces = newSpaces.concat(state.spaces)
    state.setSpaces(allSpaces)
  }
} // end of pollSpaces

runPoller(pollSpaces, INTERVAL)
