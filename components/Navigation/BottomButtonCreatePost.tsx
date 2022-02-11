import React, { useState } from 'react'
import { style } from 'styles/style'
import PostDialog from 'components/Dialog/PostDialog'
import useStore from 'lib/store'
import SVGIcon from 'components/Icon/SVGIcon'

const BottomButtonCreatePost = () => {
  const [isSignedUp] = useStore((state) => [state.isSignedUp])

  const [openPostDialog, setOpenPostDialog] = useState(false)

  if (!isSignedUp) {
    return null
  }

  const handleClose = () => setOpenPostDialog(false)

  return (
    <>
      <div className={style.navigationBottomPostButtonWrapper}>
        <div
          className={`
                ${style.navigationBottomPostButtonPseudo}
                ${style.navigationBottomPostButtonBefore}
                ${style.navigationBottomPostButtonBeforeDark}
              `}
        >
          <div
            className={`
                  ${style.navigationBottomPostButtonPseudoInner}
                  ${style.navigationBottomPostButtonBeforeInner}
                  ${style.navigationBottomPostButtonBeforeInnerDark}
                `}
          />
        </div>
        <button
          type='button'
          className={`${style.navigationBottomPostButton} ${style.buttonDecensored}`}
          onClick={() => setOpenPostDialog(true)}
        >
          <SVGIcon icon='faRocket' />
        </button>
        <div
          className={`
                ${style.navigationBottomPostButtonPseudo}
                ${style.navigationBottomPostButtonAfter}
                ${style.navigationBottomPostButtonAfterDark}
              `}
        >
          <div
            className={`
                  ${style.navigationBottomPostButtonPseudoInner}
                  ${style.navigationBottomPostButtonAfterInner}
                  ${style.navigationBottomPostButtonAfterInnerDark}
                `}
          />
        </div>
      </div>
      <PostDialog showDialog={openPostDialog} onClose={handleClose} />
    </>
  )
}

export default BottomButtonCreatePost
