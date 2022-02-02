import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'

const LoadingIndicator: FunctionComponent = () => {
  const [postsLoaded, spacesLoaded] = useStore((state) => [state.postsLoaded, state.spacesLoaded])

  const nFinished = postsLoaded.nFinished + spacesLoaded.nFinished
  const max = postsLoaded.max + spacesLoaded.max

  if (/* nFinished === 0 || */ nFinished === max || max === 0) return null

  const percentage = (100 * nFinished) / max
  // console.log(nFinished, max, percentage)
  const s = `Loaded ${percentage.toFixed(1)}%`
  // console.log(s)

  return <div className={style.loadingIndicator}>{s}</div>
}

export default LoadingIndicator
