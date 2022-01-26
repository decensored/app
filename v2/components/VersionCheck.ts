import { FunctionComponent, useState } from 'react'
import { toast } from 'react-toastify'
import { inBrowser } from 'lib/where'
import packageJson from '../package.json'

let versionInfoGiven = false // not with useState because we want the update immediately

const VersionCheck: FunctionComponent = () => {
  const [apiVersion, setApiVersion] = useState('')

  if (inBrowser) {
    if (!apiVersion) {
      // console.log('fetch /api/version')
      fetch('/api/version')
        .then((text) => text.json())
        .then((json) => {
          setApiVersion(json.version)
        })
    }

    if (!versionInfoGiven && apiVersion && apiVersion !== packageJson.version) {
      versionInfoGiven = true

      toast.info(
        `You are running version ${packageJson.version}. Refresh this window for version ${apiVersion}`,
        {
          autoClose: 5000,
        }
      )
    }
  } // else !inBrowser

  return null
}

export default VersionCheck
