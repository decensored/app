import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import useStore from 'lib/store'
import { inBrowser } from 'lib/where'

// http://localhost:3000/deeplink/defaultnode

let redirected = false

const Deeplink: NextPage = () => {
  const router = useRouter()
  const [setDefaultNodeInfo, cacheFlush] = useStore((state) => [state.setDefaultNodeInfo, state.cacheFlush])

  if (!inBrowser || redirected) return null

  redirected = true // can't use state for some reason
  cacheFlush()
  setDefaultNodeInfo(true)

  toast.success(`Default EVM node has been set!`)

  router.push('/')
  return null
}

export default Deeplink
