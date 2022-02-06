import type { PostType, SpaceType } from 'lib/types'
import { inBrowser } from 'lib/where'
import { nodeIsUpAndRunning } from 'lib/storeUtils'
import useStore, { STORE_VERSION } from 'lib/store'

export const pollingConfig = {
  batchSize: 25, // load max this many in parallel from the smartcontract
  highWater: 1250, // when we have at least this...
  lowWater: 1000, // ..reduce to this amount
}

export const limitArray = (array: PostType[] | SpaceType[], set: (value: any) => void, name = ''): void => {
  // console.log(`limitArray ${name} ${array.length}`)

  if (array.length < pollingConfig.highWater) return // early exit

  console.log(`limit ${name} length ${array.length} >= ${pollingConfig.highWater}. Reduce to ${pollingConfig.lowWater}`)

  const newArray = array.slice(0, pollingConfig.lowWater)
  set(newArray)
} // end of limitArray

//
export const runPoller = (func: (state: any) => Promise<void>, interval: number) => {
  if (!inBrowser) return

  // console.log('runPoller')

  const runPollerInner = async () => {
    const state = useStore.getState()

    const contract: any = state?.contract
    if (!nodeIsUpAndRunning(contract)) {
      // console.log('runPollerInner: waiting for node to be up and running')
      setTimeout(runPollerInner, 100) // quick retry until contract is available
      return
    }

    if (state.storeVersion !== STORE_VERSION) {
      // console.log('cacheFlush because of different store version')
      state.cacheFlush()
      setTimeout(runPollerInner, 100) // quick retry
      return
    }

    // console.log('userId', typeof state.userId, state.userId)
    if (typeof state.userId === 'string') {
      // console.log('convert userId to number')
      state.setUserId(parseInt(state.userId, 10))
      setTimeout(runPollerInner, 100) // quick retry
      return
    }

    // console.log('runPollerInner', func.name)
    await func(state)

    setTimeout(runPollerInner, interval)
  }

  runPollerInner()
}

//
