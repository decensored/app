import { getLatestAccountIndex, getUserById } from 'api/user'
import { UserType } from 'lib/types'
import { /* pollingConfig, */ runPoller } from './pollingUtils'

const INTERVAL = 9973 // highest prime below 10000

const pollAccounts = async (state: any): Promise<void> => {
  // limitArray(state.accounts, state.setAccounts, 'accounts')
  // limitArray(state.accountsQueued, state.setAccountsQueued, 'accountsQueued')

  const contract: any = state?.contract
  const latestIndex = await getLatestAccountIndex(contract)
  if (latestIndex <= state.latestAccountIndexFetched) return

  const nToLoad = latestIndex - state.latestAccountIndexFetched
  // Math.min(latestIndex - state.latestAccountIndexFetched, pollingConfig.lowWater)

  state.setLatestAccountIndexFetched(latestIndex)
  console.log(`Loading ${nToLoad} accounts`)

  console.time('Loading Accounts')
  const promises: Promise<UserType>[] = []
  for (let i = latestIndex; i > latestIndex - nToLoad; i -= 1) {
    const p = getUserById(contract, i)
    promises.push(p)
  }
  const accounts = await Promise.all(promises)
  const allAccounts = accounts.concat(state.accounts)
  state.setAccounts(allAccounts)
  console.timeEnd('Loading Accounts')
} // end of pollAccounts

runPoller(pollAccounts, INTERVAL)
