import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import BaseDialog from 'components/Dialog/BaseDialog'
import PostForm from 'components/Post/PostForm'

const PostDialog: FunctionComponent = () => {
  const { isOpenPostDialog, setIsOpenPostDialog } = useStore((state) => ({
    isOpenPostDialog: state.isOpenPostDialog,
    setIsOpenPostDialog: state.setIsOpenPostDialog,
  }))

  const handleClose = (): void => {
    setIsOpenPostDialog(false)
  }

  return (
    <BaseDialog
      showDialog={isOpenPostDialog}
      onClose={handleClose}
      bodyPadding='p-0'
      body={<PostForm spaceId={1} />}
    />
  )
}

export default PostDialog
