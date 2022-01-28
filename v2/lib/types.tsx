export type SpaceType = {
  id: number
  name: string
  owner: number
  followers: number
  posts: number
  whatever: number
  img: string
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
