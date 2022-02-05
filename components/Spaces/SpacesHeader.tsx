import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'

interface SpacesHeaderProbs {
  nrOfPosts: number
  nrOfSpaces: number
  nrOfUsers: number
}

const SpacesHeader: FunctionComponent<SpacesHeaderProbs> = ({ nrOfPosts, nrOfSpaces, nrOfUsers }) => (
  <div className={`${style.spaceHeaderWrapper} header-image variant-spaces`}>
    <div className={style.spaceHeaderInner}>
      <div className={style.spaceHeaderInnerCol1}>
        <div className={style.spaceHeaderTitle}>The Universe is infinite</div>
        <div className={style.spaceHeaderDescription}>And so are your Possibilities!</div>
      </div>
      <div className={style.spaceHeaderInnerCol2}>
        <div className={style.spaceHeaderDataWrapper}>
          <div className={style.spaceHeaderDataCol}>
            <span className={style.spaceHeaderDataTitle}>{nrOfSpaces}</span>
            <span className={style.spaceHeaderDataText}>Spaces</span>
          </div>
          <div className={style.spaceHeaderDataCol}>
            <span className={style.spaceHeaderDataTitle}>{nrOfPosts}</span>
            <span className={style.spaceHeaderDataText}>Posts</span>
          </div>
          <div className={style.spaceHeaderDataCol}>
            <span className={style.spaceHeaderDataTitle}>{nrOfUsers}</span>
            <span className={style.spaceHeaderDataText}>User</span>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default SpacesHeader
