import { SpaceType } from 'api/types'

const log = (msg: string): void => {
  console.log('api/spaces:', msg) // or outcomment
}

export const getSpaceById = async (contract: any, space_id: number) => {
  // log(`getSpaceById ${space_id}`)

  let name = await contract.spaces.methods.name_by_id(space_id).call()
  let owner = await contract.spaces.methods.owner_by_id(space_id).call()

  var result: SpaceType = {
    id: space_id,
    name: name,
    owner: owner,
    followers: 5,
    posts: 10,
    whatever: 30,
    img: 'https://www.iota-services.com/wp-content/uploads/2019/05/iota-services.jpg',
  }
  return result
}

export const getSpaceNameById = async (contract: any, spaceId: number) => {
  return await contract.spaces.methods.name_by_id(spaceId).call()
}

export const getSpaceByName = async (contract: any, name: string) => {
  log(`getSpaceByName ${name}`)

  let space_id = await contract.spaces.methods.id_by_name(name).call()
  let owner = await contract.spaces.methods.owner_by_id(space_id).call()

  var result: SpaceType = {
    id: space_id,
    name: name,
    owner: owner,
    followers: Math.floor(Math.random() * 200),
    posts: Math.floor(Math.random() * 500),
    whatever: Math.floor(Math.random() * 30),
    img: 'https://www.iota-services.com/wp-content/uploads/2019/05/iota-services.jpg',
  }
  return result
}

export const getLatestSpaceIndex = async (contract: any) => {
  log('getLatestSpaceIndex (deprecated)')

  let index = await contract.spaces.methods
    .get_latest_space_index()
    .call()
    .then(parseInt)
  return index
}

export const getAllSpaces = async (contract: any) => {
  log('getAllSpaces (deprecated)')

  const index = await getLatestSpaceIndex(contract)

  let spaces: SpaceType[] = []
  for (let i = index; i > 0; i--) {
    let space = await getSpaceById(contract, i)
    spaces.push(space)
  }
  return spaces
}

/* const createSpace = (owner: number, name: string) =>
    new Promise((resolve, reject) => {
        if (!data.name || !data.description) {
            reject(new Error('Not all information provided'));
        }
 
        const id = uuidv4();
        const newSpace = { id, ...data };
 
        spaces = { ...spaces, [id]: newSpace };
 
        setTimeout(() => resolve(true), 250);
    });
 
const updateSpace = (id, data) =>
    new Promise((resolve, reject) => {
        if (!spaces[id]) {
            return setTimeout(
                () => reject(new Error('Spae not found')),
                250
            );
        }
 
        spaces[id] = { ...spaces[id], ...data };
 
        return setTimeout(() => resolve(true), 250);
    });
 
const deleteSpace = (id) =>
    new Promise((resolve, reject) => {
        const { [id]: space, ...rest } = spaces;
 
        if (!space) {
            return setTimeout(
                () => reject(new Error('Space not found')),
                250
            );
        }
 
        spaces = { ...rest };
 
        return setTimeout(() => resolve(true), 250);
    });
*/
