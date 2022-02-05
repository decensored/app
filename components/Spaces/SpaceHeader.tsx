import React, { FunctionComponent, useState } from 'react'
import CreateSpaceDialog from 'components/Dialog/CreateSpaceDialog'
import { style } from 'styles/style'

interface SpaceHeaderProbs {
  nrOfPosts: number
  nrOfSpaces: number
  nrOfUsers: number
}

const SpaceHeader: FunctionComponent<SpaceHeaderProbs> = ({ nrOfPosts, nrOfSpaces, nrOfUsers }) => {
  const [openCreateSpaceDialog, setOpenCreateSpaceDialog] = useState(false)

  return (
    <>
      <div className={`${style.feedItemWrapper} ${style.feedItemWrapperDark}`}>
        <div className={style.feedItemInner}>
          <div className={style.startSpaceWrapper}>
            <p className={`${style.startSpaceTitle} ${style.startSpaceTitleDark}`}>Start New Space</p>
            <p className={style.startSpaceSubline}>Build your own Galaxy</p>
            <button
              type='button'
              onClick={() => setOpenCreateSpaceDialog(true)}
              className={`${style.button} ${style.buttonDecensored}`}
            >
              Create Space
            </button>
          </div>
          Posts: {nrOfPosts} - Spaces: {nrOfSpaces} - User: {nrOfUsers}
        </div>
      </div>
      <CreateSpaceDialog showDialog={openCreateSpaceDialog} onClose={() => setOpenCreateSpaceDialog(false)} />
    </>
  )
}

export default SpaceHeader
