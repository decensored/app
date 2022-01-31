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
        body={
          <div>
            <div className='mb-3'>
              <FeedItem
                type='replyToPost'
                parent={false}
                {...post}
              />
            </div>
            <PostForm spaceId={post.space} motherPost={post.id} />
          </div>
        }
        width='2xl'
      />
    )
  }
  return null
}

export default ReplyDialog
