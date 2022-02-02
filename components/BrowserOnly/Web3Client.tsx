import { FunctionComponent, useEffect } from 'react'
import { toast } from 'react-toastify'
import shallow from 'zustand/shallow'
import useStore, { DEFAULT_CONTRACTSADDRESS, DEFAULT_EVMNODE } from 'lib/store'
import { inBrowser } from 'lib/where'
import { isSignedUp } from 'api/user'

import AbiContracts from 'abis/ABI_Contracts.json'
import AbiAccounts from 'abis/ABI_Accounts.json'
import AbiPosts from 'abis/ABI_Posts.json'
import AbiSpaces from 'abis/ABI_Spaces.json'

const Web3Client: FunctionComponent = () => {
  const [defaultNodeInfo, nodeInfo, setNodeInfo, cacheFlush, setContract, setIsSignedUp] = useStore(
    (state) => [
      state.defaultNodeInfo,
      state.nodeInfo,
      state.setNodeInfo,
      state.cacheFlush,
      state.setContract,
      state.setIsSignedUp,
    ],
    shallow
  )

  // support for deeplink
  const q = new URLSearchParams(window.location.search)
  if (
    q.get('evmNode') &&
    q.get('contractsAddress') &&
    (q.get('evmNode') !== nodeInfo.evmNode || q.get('contractsAddress') !== nodeInfo.contractsAddress)
  ) {
    cacheFlush()
    setNodeInfo({
      evmNode: q.get('evmNode') as string,
      contractsAddress: q.get('contractsAddress') as string,
    })
  } // else not deeplinking (refactor this to a seperate page! (see qrcode page))

  //
  useEffect(() => {
    if (!inBrowser) return

    const makeConnection = async (): Promise<void> => {
      // console.time('Web3Client makeConnection')
      // console.log('Web3Client.defaultNodeInfo', defaultNodeInfo)

      let evmNode
      let contractsAddress
      if (defaultNodeInfo) {
        evmNode = DEFAULT_EVMNODE
        contractsAddress = DEFAULT_CONTRACTSADDRESS
        // console.log('Web3Client default nodeInfo', evmNode, contractsAddress)
      } else {
        evmNode = nodeInfo.evmNode
        contractsAddress = nodeInfo.contractsAddress
        // console.log('Web3Client custom nodeInfo', evmNode, contractsAddress)
      }

      setContract({}) // make sure we only can access the contracts when all is well
      setIsSignedUp(false)

      try {
        const Web3 = (await import('web3')).default // dynamic import
        const web3 = new Web3(evmNode)
        // console.log('Web3Client.web3', web3)

        const contracts = new web3.eth.Contract(AbiContracts as any, contractsAddress)
        // console.log('Web3Client.contracts', contracts)

        const accountsAddress = await contracts.methods.accounts().call()
        // console.log('Web3Client.accountsAddress', accountsAddress)
        const spacesAddress = await contracts.methods.spaces().call()
        // console.log('Web3Client.spacesAddress', spacesAddress)
        const postsAddress = await contracts.methods.posts().call()
        // console.log('Web3Client.postsAddress', postsAddress)

        const accounts = new web3.eth.Contract(AbiAccounts as any, accountsAddress)
        // console.log('Web3Client.accounts', accounts)
        const spaces = new web3.eth.Contract(AbiSpaces as any, spacesAddress)
        // console.log('Web3Client.spaces', spaces)
        const posts = new web3.eth.Contract(AbiPosts as any, postsAddress)
        // console.log('Web3Client.posts', posts)

        const contract = {
          accounts,
          posts,
          spaces,
          web3,
        }
        // console.log('Web3Client.setContract', contract)
        setContract(contract)

        // Check if privateKey is stored and user exists
        const privateKey = await localStorage.getItem('account_private_key')
        const signedUp = !!(privateKey && (await isSignedUp(contract)))
        // console.log('Web3Client.signedUp', signedUp)
        setIsSignedUp(signedUp)
      } catch (e: any) {
        toast.error(`Connection error: ${e.message}`, {
          autoClose: 5000,
        })
      }

      // console.timeEnd('Web3Client makeConnection')
    } // end of makeConnection(...)
    makeConnection() // call async inner function
  }, [defaultNodeInfo, nodeInfo, setContract, setIsSignedUp])

  return null // nothing to render here. It's a component because we want reactive updates from the store
}

export default Web3Client
