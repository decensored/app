import type { SpaceType } from 'lib/types'
import { readableError } from 'lib/helper'
import { executeContractFunction } from 'api/user'

const log = (msg: string): void => {
  console.log('api/spaces:', msg) // or outcomment
}

export const getSpaceById = async (contract: any, space_id: number) => {
  // log(`getSpaceById ${space_id}`)

  // const name = await contract.spaces.methods.name_by_id(space_id).call()
  // const owner = await contract.spaces.methods.owner_by_id(space_id).call()

  const space = await contract.spaces.methods.spaces(space_id).call()
  const { name, owner } = space

  const result: SpaceType = {
    id: space_id,
    name,
    owner,
    followers: 5,
    posts: 10,
    whatever: 30,
    img: 'https://www.iota-services.com/wp-content/uploads/2019/05/iota-services.jpg',
  }
  return result
}

export const getSpaceNameById = async (contract: any, spaceId: number) =>
  (await contract.spaces.methods.spaces(spaceId).call()).name
// await contract.spaces.methods.name_by_id(spaceId).call()

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
    followers: Math.floor(Math.random() * 200),
    posts: Math.floor(Math.random() * 500),
    whatever: Math.floor(Math.random() * 30),
    img: 'https://www.iota-services.com/wp-content/uploads/2019/05/iota-services.jpg',
  }
  return result
}

export const getLatestSpaceIndex = async (contract: any) => {
  // log('getLatestSpaceIndex (deprecated)')

  const index = await contract.spaces.methods
    .get_latest_space_index()
    .call()
    .then(parseInt)
  return index
}

export const getAllSpaces = async (contract: any) => {
  // log('getAllSpaces (deprecated)')

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
