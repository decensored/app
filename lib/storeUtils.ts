import type { LoadingProgressType, PostType, SpaceType, UserType } from 'lib/types'
import useStore from 'lib/store'
import orderBy from 'lodash/orderBy'

export const orderByTimestamp = <T>(collection: T[]): T[] => orderBy(collection, ['timestamp'], ['desc'])
export const orderById = <T>(collection: T[]): T[] => orderBy(collection, ['id'], ['desc'])

// CONTRACTS
export const nodeIsUpAndRunning = (contract: Record<string, unknown>): boolean => !!contract?.accounts

// ACCOUNTS
export const getUserById = (accounts: UserType[], userId: number): UserType =>
  accounts.find((account) => account.userId === userId) || ({} as UserType)

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

export const getLevel1PostForReply = (posts: PostType[], motherPost: number): PostType[] => {
  const thisPost = posts.filter((post) => post.id === motherPost)
  if (thisPost[0].mother_post === 0) {
    return thisPost
  }
  return getLevel1PostForReply(posts, thisPost[0].mother_post)
}

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

export const sortSpaces = (spaces: SpaceType[], posts: PostType[], sortType: string, userId: number): any[] => {
  const split = sortType.split('|')
  const key = split[0]
  // const order = split[1] working on passing asc / desc to use for sorting
  const preparedSpaces = spaces.map((space) => ({
    ...space,
    numberOfPostsInSpace: getNumberOfPostsInSpace(posts, space),
    latestPostIndexInSpace: getLatestPostIndexInSpace(posts, space),
  }))
  const sortedSpaces =
    sortType === 'mySpaces' && userId > 0
      ? preparedSpaces.filter((space) => space.owner === userId)
      : orderBy(Object.values(preparedSpaces), [key], ['desc'])
  return sortedSpaces
}

// HASHTAGS
export const getPostsWithHashtag = (posts: PostType[], hashtag: string): PostType[] =>
  posts.filter((post) => post.message.includes(`#${hashtag}`))

export const getTrendingHashtags = (posts: PostType[], hours: number, min: number): any => {
  const tags: string[] = []
  const regex = /[^a-z1-9]/g
  posts
    .filter((post) => post.message.includes(`#`) && post.timestamp * 1000 >= +new Date() - hours * 3600 * 1000)
    .forEach((post) => {
      post.message
        .split(' ')
        .filter((part: string) => part.startsWith('#'))
        .map((tag) => tags.push(tag.toLocaleLowerCase().replace(regex, '')))
    })

  const count = {} as any
  tags.forEach((tag) => {
    count[tag] = count[tag] ? count[tag] + 1 : 1
  })

  const trendingsTags = Object.keys(count)
    .map((tag) => ({ tag, count: count[tag] }))
    .filter((tag) => tag.count >= min)
    .sort((a: any, b: any) => b.count - a.count)

  return trendingsTags
}

// QUEUE
export const dequeuePostsAndSpaces = (): void => {
  // console.log('dequeuePostsAndSpaces')

  const state = useStore.getState()

  if (state.postsQueued.length) {
    state.setPosts(orderByTimestamp(state.postsQueued.concat(state.posts)))
    state.setPostsQueued([])
  }

  if (state.spacesQueued.length) {
    state.setSpaces(orderById(state.spacesQueued.concat(state.spaces)))
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
