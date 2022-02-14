import React, { useState } from 'react'
import { style } from 'styles/style'
import PostDialog from 'components/Dialog/PostDialog'
import useStore from 'lib/store'
import Icon from 'components/Icons/Icon'

const AsideButtonCreatePost = () => {
  const [isSignedUp] = useStore((state) => [state.isSignedUp, state.userName])

  const [openPostDialog, setOpenPostDialog] = useState(false)

  if (!isSignedUp) {
    return null
  }

  const handleClose = () => setOpenPostDialog(false)

  return (
    <>
      <div className={style.navigationAsideButtonSpacer} />
      <button
        type='submit'
        className={`
          ${style.button}
          ${style.buttonDecensored}
          ${style.buttonNoXsPadding}
        `}
        onClick={() => setOpenPostDialog(true)}
      >
        <Icon icon='faRocket' isFixed />
        <span className='hidden whitespace-nowrap sm:inline sm:pl-1'>New Post</span>
      </button>

      <PostDialog showDialog={openPostDialog} onClose={handleClose} />
    </>
  )
}

export default AsideButtonCreatePost
