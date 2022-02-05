import React, { FunctionComponent, useEffect, useState } from 'react'
import useStore from 'lib/store'
import { style } from 'styles/style'

const SpacesHeader: FunctionComponent = () => {
  const [latestSpaceIndexFetched, latestPostIndexFetched, posts] = useStore((state) => [
    state.latestSpaceIndexFetched,
    state.latestPostIndexFetched,
    state.posts, // this should later use state.latestAccountIndexFetched once we start polling accounts
  ])

  const [uniqueUsers, setUniqueUsers] = useState([])

  useEffect(() => {
    // note: this seems to work but feels a bit overcomplicated
    setUniqueUsers([
      ...new Map(posts.map((post) => [post.username, { userId: post.author, username: post.username }])).values(),
    ] as [])
  }, [posts])

  return (
    <div className={`${style.spaceHeaderWrapper} header-image variant-spaces`}>
      <div className={style.spaceHeaderInner}>
        <div className={style.spaceHeaderInnerCol1}>
          <div className={style.spaceHeaderTitle}>The Universe is infinite</div>
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
              <span className={style.spaceHeaderDataTitle}>{uniqueUsers.length}</span>
              <span className={style.spaceHeaderDataText}>User</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SpacesHeader
