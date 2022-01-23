import { getUserNameById } from 'api/user'

export const getPostById = async (contract: any, post_id: number) => {
  let post = await contract.posts.methods.posts(post_id).call()
  let username = await getUserNameById(contract, post.author)

  var result: {
    id: number
    username: string
    message: string
    author: number
    timestamp: string
    space: number
    mother_post: number
  } = {
    id: post_id,
    username: username,
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
  space_id: number
) => {
  let index = await contract.posts.methods
    .get_amount_of_posts()
    .call()
    .then(parseInt)
  return index
}

export const getAllPostsForSpace = async (contract: any, space_id: number) => {
  const index = await getLatestSpacePostIndex(contract, space_id)

  let posts: {
    id: number
    username: string
    message: string
    author: number
    timestamp: string
    space: number
    mother_post: number
  }[] = []
  for (let i = 20; i > 1; i--) {
    let post = await getPostById(contract, i)
    if (post.space === space_id) {
      posts.push(post)
    }
  }
  //console.log(posts)
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
