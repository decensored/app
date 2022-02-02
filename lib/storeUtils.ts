import type { PostType, SpaceType } from 'lib/types'
import useStore from 'lib/store'

// CONTRACTS
export const nodeIsUpAndRunning = (contract: Record<string, unknown>): boolean => !!contract?.accounts

// POSTS
export const getNumberOfPostsInSpace = (posts: PostType[], space: SpaceType): number =>
  posts.reduce((acc, post) => (post.space === space.id ? acc + 1 : acc), 0)

export const getPostsInSpace = (posts: PostType[], space: SpaceType): PostType[] =>
  posts.filter((post) => post.space === space.id)

export const getPostsForUser = (posts: PostType[], username: string): PostType[] =>
  posts.filter((post) => post.username === username)

export const getRepliesForPost = (posts: PostType[], postId: number): PostType[] =>
  posts.filter((post) => post.mother_post === postId)

export const getPostsWithoutMother = (posts: PostType[]): PostType[] => posts.filter((post) => post.mother_post === 0)

// SPACES
export const getSpaceIdByName = (spaces: SpaceType[], spaceName: string): number =>
  spaces.find((space) => space.name === spaceName)?.id || 0

export const getSpaceById = (spaces: SpaceType[], spaceId: number): SpaceType =>
  spaces.find((space) => space.id === spaceId) || ({} as SpaceType)

export const getSpaceByName = (spaces: SpaceType[], spaceName: string): SpaceType =>
  spaces.find((space) => space.name === spaceName) || ({} as SpaceType)

// QUEUE
export const dequeuePostsAndSpaces = (): void => {
  // console.log('dequeuePostsAndSpaces')

  const state = useStore.getState()

  // TODO: if (queued and existing items have a gap between them) { remove existing items }

  state.setPosts(state.postsQueued.concat(state.posts))
  state.setPostsQueued([])

  state.setSpaces(state.spacesQueued.concat(state.spaces))
  state.setSpacesQueued([])
}

//
