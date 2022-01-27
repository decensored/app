import type { PostType, SpaceType } from 'lib/types'

// POSTS
export const getNumberOfPostsInSpace = (
  posts: PostType[],
  space: SpaceType
): number =>
  posts.reduce((acc, post) => (post.space === space.id ? acc + 1 : acc), 0)

export const getPostsInSpace = (
  posts: PostType[],
  space: SpaceType
): PostType[] => posts.filter((post) => post.space === space.id)

// SPACES
export const getSpaceIdByName = (
  spaces: SpaceType[],
  spaceName: string
): number => spaces.find((space) => space.name === spaceName)?.id || 0

export const getSpaceById = (spaces: SpaceType[], spaceId: number): SpaceType =>
  spaces.find((space) => space.id === spaceId) || ({} as SpaceType)

export const getSpaceByName = (
  spaces: SpaceType[],
  spaceName: string
): SpaceType =>
  spaces.find((space) => space.name === spaceName) || ({} as SpaceType)

//
