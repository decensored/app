import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
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
  } else if (latestSpaceIndex > state.latestSpaceIndexFetched) {
    // console.log('new spaces exist', latestSpaceIndex - state.latestSpaceIndexFetched)

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
