import React, { FunctionComponent, useState } from 'react'
import CreateSpaceDialog from 'components/Dialog/CreateSpaceDialog'
import { style } from 'styles/style'

const SpaceHeader: FunctionComponent = () => {
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
        </div>
      </div>
      <CreateSpaceDialog showDialog={openCreateSpaceDialog} onClose={() => setOpenCreateSpaceDialog(false)} />
    </>
  )
}

export default SpaceHeader
