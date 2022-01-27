import type { PostType, SpaceType } from 'lib/types'

export const numberOfPostsInSpace = (
  posts: PostType[],
  space: SpaceType
): number =>
  posts.reduce((acc, post) => (post.space === space.id ? acc + 1 : acc), 0)

// export const getSpaceByName = (name: string, spaces: SpaceType[]): SpaceType => {}
