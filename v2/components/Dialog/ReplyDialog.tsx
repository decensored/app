import React, { FunctionComponent } from 'react'
import BaseDialog from 'components/Dialog/BaseDialog'
import PostForm from 'components/Post/PostForm'
import FeedItem from 'components/Feed/FeedItem'
import { classNamesLib } from 'components/ClassNames/ClassNames'

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
          <div className='flex flex-col p-5'>
            <span
              className={`${classNamesLib.tag} ${classNamesLib.tagClickable} cursor-default mb-3`}
            >
              Answer to post in <b>#{post.spaceName}</b>
            </span>
            <FeedItem
              type='replyToPost'
              {...post}
              className='border-2 border-black'
            />
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
