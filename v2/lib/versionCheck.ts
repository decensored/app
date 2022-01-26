import { toast } from 'react-toastify'
import { inBrowser } from 'lib/where'
import packageJson from '../package.json'

if (inBrowser) {
  let versionInfoGiven = false // not with useState because we want the update immediately
  let apiVersion = ''

  fetch('/api/version')
    .then((text) => text.json())
    .then((json) => {
      apiVersion = json.version
      // console.log(apiVersion)
    })

  if (!versionInfoGiven && apiVersion) {
    versionInfoGiven = true

    toast.info(
      `You are running version ${packageJson.version}. Refresh this window for version ${apiVersion}`,
      {
        autoClose: 5000,
      }
    )
  }
} // else !inBrowser
