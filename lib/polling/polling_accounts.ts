import { getLatestAccountIndex } from 'api/user'
import { runPoller } from './pollingUtils'

const INTERVAL = 9973 // highest prime below 10000

const pollAccounts = async (state: any): Promise<void> => {
  const latestPostIndex = await getLatestAccountIndex(state.contract)
  if (latestPostIndex === state.latestPostIndexFetched) return
  state.setLatestAccountIndexFetched(latestPostIndex)
}

runPoller(pollAccounts, INTERVAL)
