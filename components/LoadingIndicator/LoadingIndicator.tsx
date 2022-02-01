import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import useStore from 'lib/store'

const LoadingIndicator: FunctionComponent = () => {
  const [postsLoaded, spacesLoaded] = useStore(
    (state) => [state.postsLoaded, state.spacesLoaded],
    shallow
  )

  const nFinished = postsLoaded.nFinished + spacesLoaded.nFinished
  const max = postsLoaded.max + spacesLoaded.max

  if (nFinished === 0 || nFinished === max || max === 0) return null

  const percentage = (100 * nFinished) / max
  // console.log(nFinished, max, percentage)
  const s = `Loaded ${percentage.toFixed(1)}%`
  // console.log(s)

  return <span>{s}</span>
}

export default LoadingIndicator
