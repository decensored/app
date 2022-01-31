import { FunctionComponent, useEffect } from 'react'
// import Web3 from 'web3'
import { toast } from 'react-toastify'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import { inBrowser } from 'lib/where'
import { isSignedUp } from 'api/user'

import CONTRACT_ACCOUNTS_ABI from 'abis/contracts_Accounts_sol_Accounts.json'
import CONTRACT_POSTS_ABI from 'abis/contracts_Posts_sol_Posts.json'
import CONTRACT_SPACES_ABI from 'abis/contracts_Spaces_sol_Spaces.json'
// import CONTRACT_RATECONTROL_ABI from 'abis/contracts_RateControl_sol_RateControl.json'

let web3: any // TODO: move to store.ts

const Web3Client: FunctionComponent = () => {
  const [nodeInfo, setNodeInfo, cacheFlush, setContract, setIsSignedUp] =
    useStore(
      (state) => [
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
    q.get('contractPostsAddress') &&
    (q.get('evmNode') !== nodeInfo.evmNode ||
      q.get('contractPostsAddress') !== nodeInfo.contractPostsAddress)
  ) {
    cacheFlush()
    setNodeInfo({
      evmNode: q.get('evmNode') as string,
      contractPostsAddress: q.get('contractPostsAddress') as string,
    })
  }

  //
  useEffect(() => {
    if (!inBrowser) return

    const makeConnection = async (): Promise<void> => {
      // console.log('Web3Client.nodeInfo', nodeInfo)

      // make sure we only can access the contracts when all is well
      setContract({})

      try {
        const Web3 = (await import('web3')).default // dynamic import
        web3 = new Web3(nodeInfo.evmNode)
        // console.log('Web3Client.web3', web3)
      } catch (e: any) {
        toast.error(`Web3 error: ${e.message}`, {
          autoClose: 5000,
        })
        return
      }

      let contractPosts: any
      try {
        contractPosts = new web3.eth.Contract(
          CONTRACT_POSTS_ABI,
          nodeInfo.contractPostsAddress
        )
        // console.log('Web3Client.contractPosts', contractPosts)
      } catch (e: any) {
        toast.error(`Posts contract error: ${e.message}`, {
          autoClose: 5000,
        })
        return
      }

      contractPosts.methods
        .spaces()
        .call()
        .then((contractSpacesAddress: any) => {
          const contractSpaces = new web3.eth.Contract(
            CONTRACT_SPACES_ABI,
            contractSpacesAddress
          )
          // console.log('Web3Client.contractSpaces', contractSpaces)

          contractSpaces.methods
            .accounts()
            .call()
            .then(async (contractAccountsAddress: any) => {
              const contractAccounts = new web3.eth.Contract(
                CONTRACT_ACCOUNTS_ABI,
                contractAccountsAddress
              )
              // console.log('Web3Client.contractAccounts', contractAccounts)

              const contract = {
                accounts: contractAccounts,
                posts: contractPosts,
                spaces: contractSpaces,
                web3,
              }

              setContract(contract)
              toast('All systems are Go for launch!')

              // Check if privateKey is stored and user exists
              const privateKey = await localStorage.getItem(
                'account_private_key'
              )
              if (privateKey && (await isSignedUp(contract))) {
                setIsSignedUp(true)
              }
            })
            .catch((e: any) => {
              toast.error(`Accounts contract error: ${e.message}`, {
                autoClose: 5000,
              })
            })
        })
        .catch((e: any) => {
          toast.error(`Spaces contract error\n${e.message}`, {
            autoClose: 5000,
          })
        })
    } // end of makeConnection(...)
    makeConnection() // call async inner function
  }, [nodeInfo, setContract, setIsSignedUp])

  return null
}

export default Web3Client
