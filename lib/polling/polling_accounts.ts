import { runPoller } from './pollingUtils'

// import { getLatestAccountIndex } from 'api/user'

const INTERVAL = 9973 // highest prime below 10000

const pollAccounts = async (state: any): Promise<void> => {
  console.log('pollAccounts storeVersion', state.storeVersion)

  //   const latestPostIndex = await getLatestAccountIndex(state.contract)
  //   if (latestPostIndex === state.latestPostIndexFetched) return
  //   state.setLatestAccountIndexFeched(latestPostIndex)
} // end of pollAccounts

runPoller(pollAccounts, INTERVAL)
