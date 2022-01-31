import { readableError } from 'lib/helper'

const log = (msg: string): void => {
  console.log('api/accounts:', msg) // or outcomment
}

export const executeContractFunction = async (
  web3: any,
  function_call: any
) => {
  const privateKey = await getPrivateKey()
  // console.log('executeContractFunction.privateKey', privateKey)

  const accountAddress = await web3.eth.accounts.privateKeyToAccount(privateKey)
    .address
  // console.log('executeContractFunction.accountAddress', accountAddress)

  const options = {
    to: await function_call._parent._address,
    data: await function_call.encodeABI(),
    gas: await function_call.estimateGas({ from: accountAddress }),
    gasPrice: 0,
  }

  const signed = await web3.eth.accounts.signTransaction(options, privateKey)
  return web3.eth.sendSignedTransaction(signed.rawTransaction)
}

export const signUpUser = async (
  contract: any,
  username: string,
  token: string
) => {
  log(`signUpUser ${username} with token ${token}`)

  // Create a new web3 account
  const privateKey = await createNewPrivateKey(contract)
  console.log(`New account with privateKey ${privateKey} generated`)

  try {
    await executeContractFunction(
      contract.web3,
      contract.accounts.methods.sign_up(username, token)
    )

    const userId = await getIdByUserName(contract, username)
    const signedUp = await isSignedUp(contract)
    return {
      success: true,
      signedUp,
      username,
      userId,
    }
  } catch (error: any) {
    localStorage.removeItem('account_private_key')
    return {
      success: false,
      error: readableError(error),
    }
  }
}

export const setProfilePictureForUser = async (
  contract: any,
  profilePicture: string
) => {
  try {
    await executeContractFunction(
      contract.web3,
      contract.accounts.methods.set_profile_picture(profilePicture)
    )
    return {
      success: true,
    }
  } catch (error: any) {
    return {
      success: false,
      error: readableError(error),
    }
  }
}

export const isSignedUp = async (contract: any) => {
  const address = await getAddress(contract)
  // console.log('isSignedUp.address', address)

  return contract.accounts.methods
    .id_by_address(address)
    .call()
    .then((id: number) => id > 0)
}

export const createNewPrivateKey = async (contract: any) => {
  const account = await contract.web3.eth.accounts.create()
  localStorage.setItem('account_private_key', account.privateKey)
  return account.privateKey
}

export const getPrivateKey = async () => {
  const privateKey = localStorage.getItem('account_private_key')
  if (privateKey) {
    return privateKey
  }
}

export const getAddress = async (contract: any) => {
  const private_key = await getPrivateKey()
  return contract.web3.eth.accounts.privateKeyToAccount(private_key).address
}

export const getUserNameByAddress = async (contract: any) => {
  const address = await getAddress(contract)

  return contract.accounts.methods
    .id_by_address(address)
    .call()
    .then((id: number) => contract.accounts.methods.username_by_id(id).call())
}

export const getUserNameById = async (contract: any, user_id: number) => {
  const user = await contract.accounts.methods.username_by_id(user_id).call()
  const result: {
    name: string
  } = {
    name: user,
  }
  return result.name
}

export const getIdByUserName = async (contract: any, username: string) => {
  const userId = await contract.accounts.methods
    .id_by_username(username.toLowerCase())
    .call()
  return userId
}

export const getIdByAddress = async (contract: any) => {
  const address = await getAddress(contract)
  return contract.accounts.methods.id_by_address(address).call().then()
}

export const recoverUser = async (contract: any, privateKey: string) => {
  log(`recoverUser} with key ${privateKey}`)

  localStorage.setItem('account_private_key', privateKey)
  if (await isSignedUp(contract)) {
    const username = await getUserNameByAddress(contract)
    const userId = await getIdByUserName(contract, username)
    const result = {
      success: true,
      username,
      userId,
      error: '',
    }
    return result
  } else {
    localStorage.removeItem('account_private_key')
    const result = {
      success: false,
      error: 'Couldnt find a user with that key',
      username: '',
      userId: 0,
    }
    return result
  }
}
