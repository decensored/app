import { FunctionComponent, useEffect } from 'react'
import Web3 from 'web3'
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
  const [
    evmNode,
    setEVMnode,
    contractPostsAddress,
    setContractPostsAddress,
    setContract,
    setNodeStatus,
    setIsSignedUp,
  ] = useStore(
    (state) => [
      state.evmNode,
      state.setEVMnode,
      state.contractPostsAddress,
      state.setContractPostsAddress,
      state.setContract,
      state.setNodeStatus,
      state.setIsSignedUp,
    ],
    shallow
  )

  // support for deeplink
  const q = new URLSearchParams(window.location.search)
  if (q.get('evmNode') && q.get('evmNode') !== evmNode) {
    setEVMnode(q.get('evmNode') as string)
  }
  if (
    q.get('contractPostsAddress') &&
    q.get('contractPostsAddress') !== contractPostsAddress
  ) {
    setContractPostsAddress(q.get('contractPostsAddress') as string)
  }

  useEffect(() => {
    if (!inBrowser) return

    // console.log('Web3Client.config', evmNode, contractPostsAddress)

    // make sure we only can access the contracts when all is well
    setContract({})

    try {
      web3 = new Web3(evmNode)
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
        contractPostsAddress
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
            setNodeStatus(true)
            toast('All systems are Go for launch!')

            // Check if privateKey is stored and user exists
            const privateKey = await localStorage.getItem('account_private_key')
            if (privateKey && (await isSignedUp(contract))) {
              setIsSignedUp(true)
            }
          })
          .catch((e: any) => {
            setNodeStatus(false)
            toast.error(`Accounts contract error: ${e.message}`, {
              autoClose: 5000,
            })
          })
      })
      .catch((e: any) => {
        setNodeStatus(false)
        toast.error(`Spaces contract error\n${e.message}`, {
          autoClose: 5000,
        })
      })
  }, [evmNode, contractPostsAddress, setContract, setNodeStatus, setIsSignedUp])

  return null
}

export default Web3Client
