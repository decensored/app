import { getUserNameById } from 'api/user'
import { PostType } from 'api/types'

const log = (msg: string): void => {
  console.log('api/feed:', msg) // or outcomment
}

export const createPost = async (
  contract: any,
  spaceId: number,
  message: string
): Promise<PostType[]> => {
  log(`createPostForSpace ${spaceId}`)
  return await contract.posts.methods.submit_post(spaceId, message).call()
}

export const getPostById = async (
  contract: any,
  postId: number
): Promise<PostType> => {
  // log(`getPostById ${postId}`)

  const post = await contract.posts.methods.posts(postId).call()
  const username = await getUserNameById(contract, post.author)

  const result: PostType = {
    id: postId,
    username,
    message: post.message,
    author: post.author,
    timestamp: readable_date_time_from_unix_timestamp(post.timestamp),
    space: post.space,
    mother_post: post.mother_post,
  }
  return result
}

export const getLatestSpacePostIndex = async (
  contract: any,
  spaceId: number
): Promise<number> => {
  log(`getLatestSpacePostIndex ${spaceId}`)

  const index = await contract.posts.methods
    .get_amount_of_posts()
    .call()
    .then(parseInt)
  return index
}

export const getAllPosts = async (contract: any): Promise<PostType[]> => {
  log(`getAllPostsForFeed`)

  const index = await getLatestSpacePostIndex(contract, 0)

  const posts: PostType[] = []
  for (let i = index; i > 1; i--) {
    let post = await getPostById(contract, i)
    posts.push(post)
  }
  return posts
}

export const getAllPostsForSpace = async (
  contract: any,
  spaceId: number
): Promise<PostType[]> => {
  log(`getAllPostsForSpace ${spaceId} (deprecated)`)

  const index = await getLatestSpacePostIndex(contract, spaceId)

  const posts: PostType[] = []
  for (let i = 20; i > 1; i--) {
    let post = await getPostById(contract, i)
    if (post.space === spaceId) {
      posts.push(post)
    }
  }
  // console.log(posts)
  return posts
}

function readable_date_time_from_unix_timestamp(unix_timestamp: number) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  let date = new Date(unix_timestamp * 1000)
  return (
    months[date.getMonth()] +
    '/' +
    date.getDate() +
    ' ' +
    date.getFullYear() +
    ', ' +
    date.toTimeString().substr(0, 5)
  )
}

/*
  const createSpace = (data) =>
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
