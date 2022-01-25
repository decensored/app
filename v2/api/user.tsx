const log = (msg: string): void => {
  console.log('api/accounts:', msg) // or outcomment
}

export const executeContractFunction = async (
  web3: any,
  function_call: any
) => {
  const privateKey = await getPrivateKey()
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

  try {
    await executeContractFunction(
      contract.web3,
      contract.accounts.methods.sign_up(username)
    )

    const username2 = await getUserNameByAddress(contract)
    console.log('username2', username2)
    const userId = await getIdByUserName(contract, username)
    console.log('userId', userId)
    const signedUp = await isSignedUp(contract)
    console.log('signedUp', signedUp)

    return {
      success: true,
      signedUp,
      // privateKey,
      username,
      username2,
      userId,
    }
  } catch (err) {
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
  const privateKey = await localStorage.getItem('account_private_key')
  return privateKey
}

export const getAddress = async (contract: any) => {
  let private_key = await getPrivateKey()
  return contract.web3.eth.accounts.privateKeyToAccount(private_key).address
}

// CHECK IF NEEDED
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
