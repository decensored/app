import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import { SpaceType } from 'api/types'
import { getSpaceById } from 'api/spaces'

const INTERVAL = 10 * 1000

const poll = async (): Promise<void> => {
  const state = useStore.getState()
  const contract: any = state?.contract
  if (!contract.accounts) {
    // console.log(contract)
    setTimeout(poll, 100) // quick retry until contract is available
    return
  }

  const latestSpaceIndex = await await contract.spaces.methods
    .get_latest_space_index()
    .call()
    .then(parseInt)

  // XXX this should be optimized to only fecth new spaces

  const spacesPromises: Promise<SpaceType>[] = []
  for (let i = latestSpaceIndex; i > 0; i -= 1) {
    const p = getSpaceById(contract, i)
    spacesPromises.push(p)
  }
  const spaces = await Promise.all(spacesPromises)
  // TODO: sort by spaceId
  state.setSpaces(spaces)
  // console.log(spaces)

  setTimeout(poll, INTERVAL)
} // end of poll()

if (inBrowser) poll() // start your engines
