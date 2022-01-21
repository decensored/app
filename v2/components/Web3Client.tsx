import { FunctionComponent, useEffect } from 'react'
import Web3 from 'web3'
import useStore from '../lib/store.js'
import { inBrowser } from '../lib/where.js'

import {
  CONTRACT_ACCOUNTS_ABI,
  CONTRACT_POSTS_ABI,
  CONTRACT_SPACES_ABI,
} from '../lib/contract_abis.js'

let web3: any
let contractPosts: any
let contractSpaces: any
let contractAccounts: any

const Web3Client: FunctionComponent = () => {
  const { evmNode, chainId, contractPostsAddress } = useStore((state) => ({
    evmNode: state.evmNode,
    chainId: state.chainId,
    contractPostsAddress: state.contractPostsAddress,
  }))

  useEffect(() => {
    if (!inBrowser) return

    console.log('Web3Client.config', evmNode, chainId, contractPostsAddress)

    web3 = new Web3(evmNode)
    console.log('Web3Client.web3', web3)

    contractPosts = new web3.eth.Contract(
      CONTRACT_POSTS_ABI,
      contractPostsAddress
    )
    console.log('Web3Client.contractPosts', contractPosts)

    contractPosts.methods
      .spaces()
      .call()
      .then((contractSpacesAddress: any) => {
        contractSpaces = new web3.eth.Contract(
          CONTRACT_SPACES_ABI,
          contractSpacesAddress
        )
        console.log('Web3Client.contractSpaces', contractSpaces)

        contractSpaces.methods
          .accounts()
          .call()
          .then((contractAccountsAddress: any) => {
            contractAccounts = new web3.eth.Contract(
              CONTRACT_ACCOUNTS_ABI,
              contractAccountsAddress
            )
            console.log('Web3Client.contractAccounts', contractAccounts)
          })
      })
  }, [evmNode, chainId, contractPostsAddress])

  return null
}

//   async function execute_contract_function(web3, function_call) {
//     let privateKey = get_private_key()
//     const account_address =
//       web3.eth.accounts.privateKeyToAccount(privateKey).address
//     const options = {
//       to: function_call._parent._address,
//       data: function_call.encodeABI(),
//       gas: await function_call.estimateGas({ from: account_address }),
//       gasPrice: 0,
//     }
//     const signed =
//       await web3.eth.accounts.signTransaction(options, privateKey)
//     return web3.eth.sendSignedTransaction(signed.rawTransaction)
//   }

//   function get_address() {
//     let private_key = get_private_key()
//     return web3.eth.accounts.privateKeyToAccount(private_key).address
//   }

//   async function get_username() {
//     let address = get_address()

//     return contractAccounts.methods
//       .id_by_address(address)
//       .call()
//       .then((id) => {
//         return contract_accounts.methods.username_by_id(id).call()
//       })
//   }

//   async function is_signed_up() {
//     let address = get_address()
//     return contractAccounts.methods
//       .id_by_address(address)
//       .call()
//       .then((id) => {
//         return parseInt(id) > 0
//       })
//   }

export default Web3Client
