import { FunctionComponent, useState } from 'react'
import { toast } from 'react-toastify'
import { inBrowser } from 'lib/where'
import useInteval from 'hooks/useInterval.js'
import packageJson from '../package.json'

const INTERVAL = 60 * 1000 // between version checks

let versionInfoGiven = false // not with useState because we want the update immediately

const VersionCheck: FunctionComponent = () => {
  const [apiVersion, setApiVersion] = useState('')

  useInteval(async () => {
    if (!inBrowser || versionInfoGiven) return

    try {
      const api = await (await fetch('/api/version')).json()
      setApiVersion(api.version)
      // console.log('VersionCheck fetch /api/version', api)
    } catch (e) {
      // console.error(e)
    }
  }, INTERVAL)

  //
  if (!versionInfoGiven && apiVersion && apiVersion !== packageJson.version) {
    versionInfoGiven = true

    toast.info(
      `You are running version ${packageJson.version}. Refresh this window for version ${apiVersion}`,
      {
        autoClose: 5000,
      }
    )
  }

  //
  return null
}

export default VersionCheck
