import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import useStore from 'lib/store'
import { inBrowser } from 'lib/where'

// http://localhost:3000/deeplink/customnode/CUSTOM-NODE/CUSTOM-CONTRACTS

const Deeplink: NextPage = () => {
  const router = useRouter()
  const evmNode = router.query.evmNode as string
  const contractsAddress = router.query.contractsAddress as string

  const [nodeInfo, setNodeInfo, setDefaultNodeInfo, cacheFlush] = useStore((state) => [
    state.nodeInfo,
    state.setNodeInfo,
    state.setDefaultNodeInfo,
    state.cacheFlush,
  ])

  if (!inBrowser) return null

  // console.log(router.query, nodeInfo, evmNode, contractsAddress)

  if (evmNode && contractsAddress && (evmNode !== nodeInfo.evmNode || contractsAddress !== nodeInfo.contractsAddress)) {
    cacheFlush()
    setNodeInfo({ evmNode, contractsAddress })
    setDefaultNodeInfo(false)

    toast.success(`Custom EVM node has been set!`)

    router.push('/')
  }

  return null
}

export default Deeplink
