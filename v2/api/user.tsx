export const getUserNameById = async (contract: any, user_id: number) => {
  let user = await contract.accounts.methods.username_by_id(user_id).call()

  var result: {
    name: string
  } = {
    name: user,
  }
  return result.name
}
