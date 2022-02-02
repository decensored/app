import React, { FunctionComponent } from 'react'
import BaseDialog from 'components/Dialog/BaseDialog'
import PostForm from 'components/Post/PostForm'
import FeedItem from 'components/Feed/FeedItem'

interface ReplyDialogProbs {
  showDialog: boolean
  onClose: () => void
  post: any
}

const ReplyDialog: FunctionComponent<ReplyDialogProbs> = ({ showDialog, onClose, post }) => {
  if (post) {
    return (
      <BaseDialog
        showDialog={showDialog}
        onClose={onClose}
        clickOutside
        body={
          <div>
            <div className='mb-6'>
              <FeedItem type='replyToPost' parent={false} {...post} />
            </div>
            <PostForm spaceId={post.space} motherPost={post.id} onSpread={onClose} />
          </div>
        }
        width='2xl'
      />
    )
  }
  return null
}

export default ReplyDialog
