export type NodeInfoType = {
  evmNode: string
  contractsAddress: string
}

export type PostType = {
  id: number
  username: string
  message: string
  author: number
  timestamp: number
  space: number
  spaceName: string
  mother_post: number
}

export type SpaceType = {
  id: number
  name: string
  description: string
  owner: number
  followers: number
  posts: number
  img: string
}

export type UserType = {
  userId: number
  username: string
}
