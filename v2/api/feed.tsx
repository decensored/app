import { executeContractFunction, getUserNameById } from 'api/user'
import type { PostType } from 'lib/types'
import { getSpaceNameById } from './spaces'

const log = (msg: string): void => {
  console.log('api/feed:', msg) // or outcomment
}

export const createPost = async (
  contract: any,
  spaceId: number,
  message: string
): Promise<PostType[]> =>
  // log(`createPostForSpace ${spaceId}`)
  await executeContractFunction(
    contract.web3,
    contract.posts.methods.submit_post(spaceId, message)
  )

export const getPostById = async (
  contract: any,
  postId: number
): Promise<PostType> => {
  // log(`getPostById ${postId}`)

  const post = await contract.posts.methods.posts(postId).call()
  const username = await getUserNameById(contract, post.author)
  const spaceName = await getSpaceNameById(contract, post.space)

  const result: PostType = {
    id: postId,
    username,
    message: post.message,
    author: parseInt(post.author, 10),
    timestamp: parseInt(post.timestamp, 10),
    space: parseInt(post.space, 10),
    spaceName,
    mother_post: parseInt(post.mother_post, 10),
  }
  // console.log(result)
  return result
}

/* export const getNumberOfRepliesForPost = async (
  contract: any,
  spaceId: number
): Promise<number> => {
  return contract.accounts.methods.get_amount_of_replies_by_post(spaceId).call()
} */

export const getLatestPostIndex = async (contract: any): Promise<number> => {
  const index = await contract.posts.methods
    .get_amount_of_posts()
    .call()
    .then(parseInt)
  return index
}

export const getAllPosts = async (contract: any): Promise<PostType[]> => {
  // log(`getAllPostsForFeed`)

  const index = await getLatestPostIndex(contract)

  const posts: PostType[] = []
  for (let i = index; i > 1; i--) {
    const post = await getPostById(contract, i)
    posts.push(post)
  }
  return posts
}

export const getAllPostsForSpace = async (
  contract: any,
  spaceId: number
): Promise<PostType[]> => {
  // log(`getAllPostsForSpace ${spaceId} (deprecated)`)

  const index = await getLatestPostIndex(contract)

  const posts: PostType[] = []
  for (let i = 20; i > 1; i--) {
    const post = await getPostById(contract, i)
    if (post.space === spaceId) {
      posts.push(post)
    }
  }
  // console.log(posts)
  return posts
}

// Replies
export const createReply = async (
  contract: any,
  mother_post: number,
  message: string
): Promise<PostType[]> =>
  // log(`createPostForSpace ${spaceId}`)
  await executeContractFunction(
    contract.web3,
    contract.posts.methods.submit_reply(mother_post, message)
  )

/* export const getRepliesByPost = async (
  contract: any,
  postId: number
): Promise<number> => {
  return await contract.posts.methods.replies_by_post(postId).call()
}
 */
