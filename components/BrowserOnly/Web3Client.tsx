import { FunctionComponent, useEffect } from 'react'
// import { toast } from 'react-toastify'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'
import { inBrowser } from 'lib/where'
import { isSignedUp } from 'api/user'

import AbiContracts from 'abis/ABI_Contracts.json'
import AbiAccounts from 'abis/ABI_Accounts.json'
import AbiPosts from 'abis/ABI_Posts.json'
import AbiSpaces from 'abis/ABI_Spaces.json'

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
    q.get('contractsAddress') &&
    (q.get('evmNode') !== nodeInfo.evmNode ||
      q.get('contractsAddress') !== nodeInfo.contractsAddress)
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
      const { evmNode, contractsAddress } = nodeInfo
      console.log('Web3Client', evmNode, contractsAddress)

      setContract({}) // make sure we only can access the contracts when all is well

      const Web3 = (await import('web3')).default // dynamic import
      web3 = new Web3(evmNode)
      console.log('Web3Client.web3', web3)

      const contracts = new web3.eth.Contract(AbiContracts, contractsAddress)
      console.log('Web3Client.contracts', contracts)

      const accountsAddress = await contracts.methods.accounts().call()
      console.log('Web3Client.accountsAddress', accountsAddress)
      const spacesAddress = await contracts.methods.spaces().call()
      console.log('Web3Client.spacesAddress', spacesAddress)
      const postsAddress = await contracts.methods.posts().call()
      console.log('Web3Client.postsAddress', postsAddress)

      const accounts = new web3.eth.Contract(AbiAccounts, accountsAddress)
      console.log('Web3Client.accounts', accounts)
      const spaces = new web3.eth.Contract(AbiSpaces, spacesAddress)
      console.log('Web3Client.spaces', spaces)
      const posts = new web3.eth.Contract(AbiPosts, postsAddress)
      console.log('Web3Client.posts', posts)

      const contract = {
        accounts,
        posts,
        spaces,
        web3,
      }
      console.log('Web3Client.setContract', contract)
      setContract(contract)

      // Check if privateKey is stored and user exists
      const privateKey = await localStorage.getItem('account_private_key')
      const signedUp = privateKey && (await isSignedUp(contract))
      console.log('Web3Client.signedUp', signedUp)
      setIsSignedUp(signedUp)

      /*
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
              // toast('All systems are Go for launch!')

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
*/
    } // end of makeConnection(...)
    makeConnection() // call async inner function
  }, [nodeInfo, setContract, setIsSignedUp])

  return null
}

export default Web3Client
