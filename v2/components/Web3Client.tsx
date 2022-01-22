import { FunctionComponent, useEffect } from 'react'
import Web3 from 'web3'
import { toast } from 'react-toastify'
import shallow from 'zustand/shallow'
import useStore from '../lib/store'
import { inBrowser } from '../lib/where'

import {
  CONTRACT_ACCOUNTS_ABI,
  CONTRACT_POSTS_ABI,
  CONTRACT_SPACES_ABI,
} from '../lib/contract_abis.js'

let web3: any // TODO: move to store.ts

const Web3Client: FunctionComponent = () => {
  const [evmNode, contractPostsAddress, setContract] = useStore(
    (state) => [state.evmNode, state.contractPostsAddress, state.setContract],
    shallow
  )

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
          .then((contractAccountsAddress: any) => {
            const contractAccounts = new web3.eth.Contract(
              CONTRACT_ACCOUNTS_ABI,
              contractAccountsAddress
            )
            // console.log('Web3Client.contractAccounts', contractAccounts)

            setContract({
              accounts: contractAccounts,
              posts: contractPosts,
              spaces: contractSpaces,
            })
            toast('All systems are Go for launch!')
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
  }, [evmNode, contractPostsAddress, setContract])

  return null
}

// this code need to be modified for v2...

// export const executeContractFunction = async (
//   // web3: any,
//   privateKey: string,
//   functionCall: any
// ): Promise<any> => {
//   const accountAddress =
//     web3.eth.accounts.privateKeyToAccount(privateKey).address

//   // https://eslint.org/docs/rules/no-underscore-dangle
//   const options = {
//     to: functionCall._parent._address,
//     data: functionCall.encodeABI(),
//     gas: await functionCall.estimateGas({ from: accountAddress }),
//     gasPrice: 0,
//   }
//   const signed = await web3.eth.accounts.signTransaction(options, privateKey)
//   return web3.eth.sendSignedTransaction(signed.rawTransaction)
// }

// export const getAddress = async (privateKey: any): Promise<any> =>
//   web3.eth.accounts.privateKeyToAccount(privateKey).address

// async function get_username() {
//   let address = get_address()

//   return contractAccounts.methods
//     .id_by_address(address)
//     .call()
//     .then((id) => {
//       return contract_accounts.methods.username_by_id(id).call()
//     })
// }

// async function is_signed_up() {
//   let address = get_address()
//   return contractAccounts.methods
//     .id_by_address(address)
//     .call()
//     .then((id) => {
//       return parseInt(id) > 0
//     })
// }

export default Web3Client
