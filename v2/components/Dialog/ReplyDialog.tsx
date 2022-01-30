import React, { FunctionComponent } from 'react'
import BaseDialog from 'components/Dialog/BaseDialog'
import PostForm from 'components/Post/PostForm'
import FeedItem from 'components/Feed/FeedItem'

interface ReplyDialogProbs {
  showDialog: boolean
  onClose: () => void
  post: any
}

const ReplyDialog: FunctionComponent<ReplyDialogProbs> = ({
  showDialog,
  onClose,
  post,
}) => {
  console.log(post)
  if (post) {
    return (
      <BaseDialog
        showDialog={showDialog}
        onClose={onClose}
        bodyPadding='p-0'
        body={
          <>
            <FeedItem type='replyToPost' {...post} />
            <PostForm spaceId={post.space} motherPost={post.id} />
          </>
        }
        width='2xl'
      />
    )
  }
  return null
}

export default ReplyDialog
