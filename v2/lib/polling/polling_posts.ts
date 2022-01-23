import { inBrowser } from 'lib/where'
import useStore from 'lib/store'
import { PostType } from 'api/types'
import { getPostById } from 'api/feed'

const INTERVAL = 10 * 1000

const poll = async (): Promise<void> => {
  const state = useStore.getState()
  const contract: any = state?.contract
  if (!contract.accounts) {
    setTimeout(poll, 100) // quick retry until contract is available
    return
  }

  // XXX this should be optimized to only fecth new posts

  const postsPromises: Promise<PostType>[] = []
  for (let i = 20; i >= 1; i -= 1) {
    const p = getPostById(contract, i)
    postsPromises.push(p)
  }
  const posts = await Promise.all(postsPromises)
  // TODO: sort by postId
  state.setPosts(posts)
  // console.log('posts', posts)

  setTimeout(poll, INTERVAL)
} // end of poll()

if (inBrowser) poll() // start your engines
