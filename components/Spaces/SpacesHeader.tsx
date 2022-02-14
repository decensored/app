import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'

const SpacesHeader: FunctionComponent = () => {
  const [latestSpaceIndexFetched, latestPostIndexFetched, latestAccountIndexFetched] = useStore((state) => [
    state.latestSpaceIndexFetched,
    state.latestPostIndexFetched,
    state.latestAccountIndexFetched,
  ])

  return (
    <div className={`${style.spaceHeaderWrapper} header-image variant-spaces`}>
      <div className={style.spaceHeaderInner}>
        <div className={style.spaceHeaderInnerCol1}>
          <div className={style.spaceHeaderTitle}>Universe is infinite</div>
          <div className={style.spaceHeaderDescription}>And so are your Possibilities!</div>
        </div>
        <div className={style.spaceHeaderInnerCol2}>
          <div className={style.spaceHeaderDataWrapper}>
            <div className={style.spaceHeaderDataCol}>
              <span className={style.spaceHeaderDataTitle}>{latestSpaceIndexFetched}</span>
              <span className={style.spaceHeaderDataText}>Spaces</span>
            </div>
            <div className={style.spaceHeaderDataCol}>
              <span className={style.spaceHeaderDataTitle}>{latestPostIndexFetched}</span>
              <span className={style.spaceHeaderDataText}>Posts</span>
            </div>
            <div className={style.spaceHeaderDataCol}>
              <span className={style.spaceHeaderDataTitle}>{latestAccountIndexFetched}</span>
              <span className={style.spaceHeaderDataText}>Users</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpacesHeader
