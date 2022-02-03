import type { LoadingProgressType, PostType, SpaceType } from 'lib/types'
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

export const getRootLevelPosts = (posts: PostType[]): PostType[] => posts.filter((post) => post.mother_post === 0)

export const getRepliesForPost = (posts: PostType[], postId: number): PostType[] =>
  posts.filter((post) => post.mother_post === postId)

export const getNumberOfRepliesForPostRecursive = (posts: PostType[], postId: number, count = 0): number => {
  let cnt = count

  getRepliesForPost(posts, postId).forEach((reply) => {
    cnt = getNumberOfRepliesForPostRecursive(posts, reply.id, cnt) + 1
  })

  return cnt
}

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

  if (state.postsQueued.length) {
    state.setPosts(state.postsQueued.concat(state.posts).sort((a, b) => b.timestamp - a.timestamp))
    state.setPostsQueued([])
  }

  if (state.spacesQueued.length) {
    state.setSpaces(state.spacesQueued.concat(state.spaces).sort((a, b) => b.id - a.id))
    state.setSpacesQueued([])
  }
}

// LOADING...
export const arePostsOrSpacesLoading = (
  postsLoaded: LoadingProgressType,
  spacesLoaded: LoadingProgressType
): boolean => {
  // console.log('arePostsOrSpacesLoading')

  const nFinished = postsLoaded.nFinished + spacesLoaded.nFinished
  const max = postsLoaded.max + spacesLoaded.max

  return !(nFinished === max || max === 0)
}

//
