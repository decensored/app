import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'
import { arePostsOrSpacesLoading } from 'lib/storeUtils'

const LoadingIndicator: FunctionComponent = () => {
  const [postsLoaded, spacesLoaded] = useStore((state) => [state.postsLoaded, state.spacesLoaded])
  if (!arePostsOrSpacesLoading(postsLoaded, spacesLoaded)) return null

  const nFinished = postsLoaded.nFinished + spacesLoaded.nFinished
  const max = postsLoaded.max + spacesLoaded.max
  const percentage = (100 * nFinished) / max
  // console.log(nFinished, max, percentage)
  const s = `Loaded ${percentage.toFixed(1)}%`
  // console.log(s)

  return <div className={style.loadingIndicator}>{s}</div>
}

export default LoadingIndicator
