import type { SpaceType } from 'lib/types'
import { readableError } from 'lib/helper'
import { executeContractFunction /* , getIdByUserName */ } from 'api/user'

const log = (msg: string): void => {
  console.log('api/spaces:', msg) // or outcomment
}

export const getSpaceById = async (contract: any, space_id: number) => {
  // log(`getSpaceById ${space_id}`)
  const space = await contract.spaces.methods.spaces(space_id).call()
  const { name, owner } = space

  const result: SpaceType = {
    id: space_id,
    name,
    owner,
    followers: 0,
    posts: 0,
    img: 'https://www.iota-services.com/wp-content/uploads/2019/05/iota-services.jpg',
  }
  return result
}

export const getSpaceNameById = async (contract: any, spaceId: number) =>
  (await contract.spaces.methods.spaces(spaceId).call()).name

export const getSpaceByName = async (contract: any, name: string) => {
  log(
    `getSpaceByName ${name} (deprecated, use version from lib/storeUtils instead)`
  )

  const space_id = parseInt(
    await contract.spaces.methods.id_by_name(name).call()
  )
  const space = await getSpaceById(contract, space_id)

  const result: SpaceType = {
    id: space_id,
    name: space.name,
    owner: space.id,
    followers: 0,
    posts: 0,
    img: 'https://www.iota-services.com/wp-content/uploads/2019/05/iota-services.jpg',
  }
  return result
}

export const getLatestSpaceIndex = async (contract: any) => {
  log('getLatestSpaceIndex (deprecated)')

  const index = await contract.spaces.methods
    .get_latest_space_index()
    .call()
    .then(parseInt)
  return index
}

export const getAllSpaces = async (contract: any) => {
  log('getAllSpaces (deprecated)')

  const index = await getLatestSpaceIndex(contract)

  const spaces: SpaceType[] = []
  for (let i = index; i > 0; i--) {
    const space = await getSpaceById(contract, i)
    spaces.push(space)
  }
  return spaces
}

export const createSpace = async (contract: any, name: string) => {
  log(`CreateSpace ${name}`)

  try {
    await executeContractFunction(
      contract.web3,
      contract.spaces.methods.create(name)
    )
    return { success: true }
  } catch (error) {
    return { success: false, error: readableError(error) }
  }
}

/*
  Function to add or remove user from Blacklist
  For now it takes the spaceName and username instead of the id's as they dont exist on the post right now
*/
export const addUserToBlacklist = async (
  contract: any,
  spaceId: number,
  authorId: number
) => {
  // log(`Add user ${userName} to blacklist for space ${spaceName}`)

  /*   const spaceId = await contract.spaces.methods.id_by_name(spaceName).call()
  const userId = await getIdByUserName(contract, userName) */

  try {
    await executeContractFunction(
      contract.web3,
      contract.spaces.methods.add_account_to_blacklist(spaceId, authorId)
    )
    const check = await userBlackListedForSpace(contract, spaceId, authorId)
    console.log(`User ${authorId} blacklisted for ${spaceId} is ${check}`)
    return { success: true }
  } catch (error) {
    return { success: false, error: readableError(error) }
  }
}

export const removeUserFromBlacklist = async (
  contract: any,
  spaceId: number,
  authorId: number
) => {
  // log(`Remove user ${userName} from blacklist for space ${spaceName}`)

  /*   const spaceId = await contract.spaces.methods.id_by_name(spaceName).call()
  const userId = await getIdByUserName(contract, userName) */

  try {
    await executeContractFunction(
      contract.web3,
      contract.spaces.methods.remove_account_from_blacklist(spaceId, authorId)
    )
    const check = await userBlackListedForSpace(contract, spaceId, authorId)
    console.log(`User ${authorId} blacklisted for ${spaceId} is ${check}`)
    return { success: true }
  } catch (error) {
    return { success: false, error: readableError(error) }
  }
}

export const userBlackListedForSpace = async (
  contract: any,
  spaceId: number,
  userId: number
) =>
  // console.log(`Check if user ${userId} is blacklisted for Space ${spaceId}`)
  await contract.spaces.methods.is_blacklisted(spaceId, userId).call()
