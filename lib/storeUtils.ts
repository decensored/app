import type { LoadingProgressType, PostType, SpaceType } from 'lib/types'
import useStore from 'lib/store'
import { orderBy } from 'lodash'

// CONTRACTS
export const nodeIsUpAndRunning = (contract: Record<string, unknown>): boolean => !!contract?.accounts

// POSTS
export const getPostById = (posts: PostType[], postId: number): PostType =>
  posts.find((post) => post.id === postId) || ({} as PostType)

export const getNumberOfPostsInSpace = (posts: PostType[], space: SpaceType): number =>
  posts.reduce((acc, post) => (post.space === space.id ? acc + 1 : acc), 0)

export const getPostsInSpace = (posts: PostType[], space: SpaceType): PostType[] =>
  posts.filter((post) => post.space === space.id)

export const getLatestPostIndexInSpace = (posts: PostType[], space: SpaceType): number => {
  const postsInSpace = getPostsInSpace(posts, space)
  if (postsInSpace.length > 0) {
    return postsInSpace.reduce((max, obj) => (max.id > obj.id ? max : obj)).id
  }
  return 0
}

export const getPostsForUser = (posts: PostType[], username: string): PostType[] =>
  posts.filter((post) => post.username === username)

export const getRootLevelPosts = (posts: PostType[]): PostType[] => posts.filter((post) => post.mother_post === 0)

export const getRepliesForPost = (posts: PostType[], postId: number): PostType[] =>
  posts.filter((post) => post.mother_post === postId)

// This is slightly overcomplicated to avoid running once for 'total' and once for 'read'
export const getNumberOfRepliesForPostRecursive = (
  posts: PostType[],
  postId: number,
  count = { total: 0, read: 0 }
): { total: number; read: number } => {
  // const { postSeen } = useStore.getState()

  let cnt = count

  getRepliesForPost(posts, postId).forEach((reply) => {
    cnt = getNumberOfRepliesForPostRecursive(posts, reply.id, cnt)
    cnt.total += 1
    cnt.read += reply.read ? 1 : 0
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

export const sortSpaces = (spaces: SpaceType[], posts: PostType[], sortType: string): any[] => {
  const split = sortType.split('|')
  const key = split[0]
  // const order = split[1] working on passing asc / desc to use for sorting
  const preparedSpaces = spaces.map((space) => ({
    ...space,
    numberOfPostsInSpace: getNumberOfPostsInSpace(posts, space),
    latestPostIndexInSpace: getLatestPostIndexInSpace(posts, space),
  }))
  const sortedSpaces = orderBy(Object.values(preparedSpaces), [key], ['desc'])
  return sortedSpaces
}

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
