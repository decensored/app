import React, { FunctionComponent } from 'react'
import BaseDialog from 'components/Dialog/BaseDialog'
import PostForm from 'components/Post/PostForm'

interface PostDialogProps {
  showDialog: boolean
  onClose: () => void
}

const PostDialog: FunctionComponent<PostDialogProps> = ({
  showDialog,
  onClose,
}) => (
  <BaseDialog
    showDialog={showDialog}
    onClose={onClose}
    bodyPadding='p-0'
    body={<PostForm spaceId={1} />}
    width='2xl'
  />
)

export default PostDialog
