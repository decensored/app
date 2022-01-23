import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import { SpaceType } from 'api/types'
import { getSpaceById } from 'api/spaces'

const INTERVAL = 10 * 1000

const SpaceSPoll = async (): Promise<void> => {
  const {
    latestSpaceIndexFetched,
    setLatestSpaceIndexFetched,
    existingSpaces,
  } = useStore((state) => ({
    latestSpaceIndexFetched: state.latestSpaceIndexFetched,
    setLatestSpaceIndexFetched: state.setLatestSpaceIndexFetched,
    existingSpaces: state.spaces,
  }))

  const state = useStore.getState()
  const contract: any = state?.contract
  if (!contract.accounts) {
    // console.log(contract)
    setTimeout(SpaceSPoll, 100) // quick retry until contract is available
    return
  }

  const latestSpaceIndex = await await contract.spaces.methods
    .get_latest_space_index()
    .call()
    .then(parseInt)

  // Check if new spaces exist
  if(latestSpaceIndex > latestSpaceIndexFetched) {
    const spacesPromises: Promise<SpaceType>[] = []
    for (let i = latestSpaceIndex; i > latestSpaceIndexFetched; i -= 1) {
      const p = getSpaceById(contract, i)
      spacesPromises.push(p)
    }
    const spaces = await Promise.all(spacesPromises)

    // Set new index & push new spaces into possibly existing array
    setLatestSpaceIndexFetched(latestSpaceIndex)
    existingSpaces.map(space => spaces.push(space))
    state.setSpaces(spaces)
  }

  setTimeout(SpaceSPoll, INTERVAL)
} // end of poll()

if (inBrowser) SpaceSPoll() // start your engines
