const log = (msg: string): void => {
  console.log('api/accounts:', msg) // or outcomment
}

export const executeContractFunction = async (
  web3: any,
  function_call: any,
  privateKey: string
) => {
  console.log('executeContractFunction.privateKey', privateKey)

  const accountAddress = await web3.eth.accounts.privateKeyToAccount(privateKey)
    .address
  console.log('executeContractFunction.accountAddress', accountAddress)

  const options = {
    to: await function_call._parent._address,
    data: await function_call.encodeABI(),
    gas: await function_call.estimateGas({ from: accountAddress }),
    gasPrice: 0,
  }

  const signed = await web3.eth.accounts.signTransaction(options, privateKey)
  return web3.eth.sendSignedTransaction(signed.rawTransaction)
}

export const signUpUser = async (contract: any, username: string) => {
  log(`signUpUser ${username}`)

  /* I think we dont need this?
  // const privateKey = await createNewPrivateKey(contract) // overwrite existing or debugging only
  // console.log('new privateKey', privateKey)

  const isSignedUp1 = await isSignedUp(contract)
  console.log('isSignedUp1', isSignedUp1)
  if (isSignedUp1) {
    let address = await getAddress(contract)
    console.log('address', address)

    const username3 = await getUserNameByAddress(contract)
    console.log('username3', username3)
  } 
  */

  const privateKey = await createNewPrivateKey(contract) // overwrite existing or debugging only
  console.log('new privateKey', privateKey)

  try {
    await executeContractFunction(
      contract.web3,
      contract.accounts.methods.sign_up(username),
      privateKey
    )
    const userId = await getIdByUserName(contract, username)
    const signedUp = await isSignedUp(contract)

    return {
      success: true,
      signedUp,
      username,
      userId,
    }
  } catch (err) {
    localStorage.removeItem('account_private_key')
    return {
      success: false,
      err: (err as any).toString(),
    }
  }
}

export const isSignedUp = async (contract: any) => {
  let address = await getAddress(contract)
  console.log('isSignedUp.address', address)

  return contract.accounts.methods
    .id_by_address(address)
    .call()
    .then((id: number) => {
      return id > 0
    })
}

export const createNewPrivateKey = async (contract: any) => {
  let account = await contract.web3.eth.accounts.create()
  localStorage.setItem('account_private_key', account['privateKey'])
  return account['privateKey']
}

export const getPrivateKey = async () => {
  const privateKey = localStorage.getItem('account_private_key')
  if (privateKey) {
    return privateKey
  } else {
    console.log('bla')
    return
  }
}

export const getAddress = async (contract: any) => {
  let private_key = await getPrivateKey()
  return contract.web3.eth.accounts.privateKeyToAccount(private_key).address
}

export const getUserNameByAddress = async (contract: any) => {
  let address = await getAddress(contract)

  return contract.accounts.methods
    .id_by_address(address)
    .call()
    .then((id: number) => {
      return contract.accounts.methods.username_by_id(id).call()
    })
}

export const getUserNameById = async (contract: any, user_id: number) => {
  let user = await contract.accounts.methods.username_by_id(user_id).call()
  var result: {
    name: string
  } = {
    name: user,
  }
  return result.name
}

export const getIdByUserName = async (contract: any, username: string) => {
  return contract.accounts.methods.id_by_username(username).call()
}

export const recoverUser = async (contract: any, privateKey: string) => {
  log(`recoverUser} with key ${privateKey}`)
  localStorage.setItem('account_private_key', privateKey)
  if (await isSignedUp(contract)) {
    const username = await getUserNameByAddress(contract)
    const userId = await getIdByUserName(contract, username)
    const result = {
      success: true,
      username: username,
      userId: userId,
    }
    return result
  } else {
    localStorage.removeItem('account_private_key')
    const result = {
      success: false,
      message: 'Couldnt find a user with that key',
      username: '',
    }
    return result
  }
}
