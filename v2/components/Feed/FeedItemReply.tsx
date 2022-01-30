import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import TimeAgo from 'react-timeago'
import { getRepliesForPost } from 'lib/storeUtils'
import ReplyDialog from 'components/Dialog/ReplyDialog'

interface FeedItemProps {
  id: number
  author: number
  username: string
  message: string
  timestamp: number
  space: number
  spaceName: string
  type: string
  moderator?: boolean
  blacklist?: any
  userBlacklisted?: boolean
  replies?: any
}

const FeedItemReply: FunctionComponent<FeedItemProps> = ({
  id,
  author,
  username,
  message,
  timestamp,
  space,
  spaceName,
  replies,
}) => {
  const { posts } = useStore((state) => ({
    posts: state.posts,
  }))
  const [renderDialog, setRenderDialog] = React.useState(false)
  const [openReplyDialog, setOpenReplyDialog] = React.useState(false)
  const [openReplies, setOpenReplies] = React.useState(true)

  // Create replies
  let replyItems
  if (replies) {
    replyItems = replies.map((post: any) => {
      const repliesForPost = getRepliesForPost(posts, post.id)
      return (
        <FeedItemReply
          key={post.timestamp}
          type='reply'
          replies={repliesForPost}
          moderator={false}
          {...post}
        />
      )
    })
  }
  const repliesExist = replyItems.length > 0

  const thisPost = {
    id,
    author,
    username,
    message,
    timestamp,
    space,
    spaceName,
  }

  return (
    <div
      className={`${classNamesLib.feedItemReplyWrapper} ${classNamesLib.feedItemWrapperDark}`}
    >
      <div className={classNamesLib.feedItemReplyInnerTop}>
        <div className={classNamesLib.feedItemMetaWrapper}>
          <Link href={`/user/${username}`} passHref>
            <a
              href='dummy-href'
              className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
            >
              {username}
            </a>
          </Link>
          <div className={classNamesLib.feedItemMetaTimestamp}>
            <TimeAgo date={new Date(timestamp * 1000)} />
          </div>
        </div>
        <div
          className={`${classNamesLib.feedItemText} ${classNamesLib.feedItemTextDark}`}
        >
          {message}
        </div>
        <div className='flex pt-3'>
          <button
            type='button'
            onClick={() => {
              setRenderDialog(true)
              setOpenReplyDialog(true)
            }}
            className='cursor-pointer text-xs text-highlight-500'
          >
            Comment
          </button>
          {renderDialog && (
            <ReplyDialog
              showDialog={openReplyDialog}
              onClose={() => setOpenReplyDialog(false)}
              post={thisPost}
            />
          )}
          {repliesExist && (
            <>
              {!openReplies && (
                <button
                  type='button'
                  onClick={() => {
                    setOpenReplies(true)
                  }}
                  className='cursor-pointer text-xs pl-2'
                >
                  - Show {replies.length} replie(s)
                </button>
              )}
              {openReplies && (
                <button
                  type='button'
                  onClick={() => {
                    setOpenReplies(false)
                  }}
                  className='cursor-pointer text-xs pl-2'
                >
                  - Hide {replies.length} replie(s)
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {openReplies && <div className='pl-7'> {replyItems}</div>}
    </div>
  )
}

export default FeedItemReply
