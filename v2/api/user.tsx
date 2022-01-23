const log = (msg: string): void => {
  console.log('api/accounts:', msg) // or outcomment
}

export const executeContractFunction = async (
  web3: any,
  function_call: any
) => {
  const privateKey = await getPrivateKey()
  const account_address = await web3.eth.accounts.privateKeyToAccount(
    privateKey
  ).address
  const options = {
    to: await function_call._parent._address,
    data: await function_call.encodeABI(),
    gas: await function_call.estimateGas({ from: account_address }),
    gasPrice: 0,
  }
  const signed = await web3.eth.accounts.signTransaction(options, privateKey)
  return web3.eth.sendSignedTransaction(signed.rawTransaction)
}

export const signUpUser = async (contract: any, username: string) => {
  log(`signUpUser ${username}`)
  const privateKey = await createNewPrivateKey(contract)
  executeContractFunction(
    contract.web3,
    contract.accounts.methods.sign_up(username)
  )
    .then(async () => {
      const username = await getUserNameByAddress(contract)
      const userId = await getIdByUserName(contract, username)
      const check = await isSignedUp(contract)
      const result = {
        success: true,
        signedUp: check,
        privateKey: privateKey,
        username: username,
        userId: userId,
      }
      console.log(result)
      return result
    })
    .catch((error) => {
      const result = {
        success: false,
        message: 'User name already exists!',
        error: error,
      }
      console.log(result)
      return result
    })
}

export const isSignedUp = async (contract: any) => {
  let address = await getAddress(contract)
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
