import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import type { SpaceType } from 'lib/types'
import { getSpaceById } from 'api/spaces'

const INTERVAL = 10 * 1000

const poll = async (): Promise<void> => {
  const state = useStore.getState()

  const contract: any = state?.contract
  if (!contract.accounts) {
    setTimeout(poll, 100) // quick retry until contract is available
    return
  }

  const latestSpaceIndex = await contract.spaces.methods
    .get_latest_space_index()
    .call()
    .then(parseInt)

  if (latestSpaceIndex < state.latestSpaceIndexFetched) {
    // the smartcontract has been reset
    state.setLatestSpaceIndexFetched(0)
    state.setSpaces([])
  } else if (latestSpaceIndex > state.latestSpaceIndexFetched) {
    // new spaces exist

    // console.log(latestSpaceIndex - state.latestSpaceIndexFetched, 'NEW SPACES')

    const spacesPromises: Promise<SpaceType>[] = []
    for (let i = latestSpaceIndex; i > state.latestSpaceIndexFetched; i -= 1) {
      const p = getSpaceById(contract, i)
      spacesPromises.push(p)
    }
    const spaces = await Promise.all(spacesPromises)

    // Set new index & push new spaces into possibly existing array
    state.setLatestSpaceIndexFetched(latestSpaceIndex)
    state.spaces.map((space) => spaces.push(space))
    state.setSpaces(spaces)
  }

  setTimeout(poll, INTERVAL)
} // end of poll()

if (inBrowser) poll() // start your engines
