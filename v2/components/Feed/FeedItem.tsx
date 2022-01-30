import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import Link from 'next/link'
import useStore from 'lib/store'
import SVGIcon from 'components/Icon/SVGIcon'
import { style } from 'styles/style'
import TimeAgo from 'react-timeago'
import { addUserToBlacklist } from 'api/spaces'
import { toast } from 'react-toastify'
import ReplyDialog from 'components/Dialog/ReplyDialog'
import { getRepliesForPost } from 'lib/storeUtils'

interface FeedItemProps {
  id: number
  author: number
  username: string
  message: string
  timestamp: number
  space: number
  spaceName: string
  moderator?: boolean
  blacklist?: any
  userBlacklisted?: boolean
  replies?: any
  type: string
  parent?: boolean
}

const FeedItem: FunctionComponent<FeedItemProps> = ({
  id,
  author,
  username,
  message,
  timestamp,
  space,
  spaceName,
  moderator,
  blacklist,
  userBlacklisted,
  replies,
  type,
  parent,
}) => {
  const [renderDialog, setRenderDialog] = React.useState(false)
  const [openReplyDialog, setOpenReplyDialog] = React.useState(false)
  const [openReplies, setOpenReplies] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)
  const [contract, userId, posts] = useStore(
    (state) => [state.contract, state.userId, state.posts],
    shallow
  )

  const setAddUserToBlacklist = async (): Promise<void> => {
    setIsLoading(true)
    const result = await addUserToBlacklist(contract, space, author)
    if (result.success) {
      toast.success(`User ${username} has been blacklisted for this space!`, {
        autoClose: 3000,
      })
      // Add user to blacklistArray
      const user = {
        userId: author,
        username,
      }
      blacklist.push(user)
      setIsLoading(false)
    } else {
      toast.error(`${result.error}`, {
        autoClose: 3000,
      })
      setIsLoading(false)
    }
  }
  const showBlackListLabel = !userBlacklisted && author !== userId

  // Create list of Replies
  let replyItems = []
  if (replies) {
    replyItems = replies.map((post: any) => {
      const repliesForPost = getRepliesForPost(posts, post.id)
      return (
        <FeedItem
          key={post.timestamp}
          type='reply'
          replies={repliesForPost}
          moderator={false}
          parent={false}
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
      className={`
        ${style.feedItemWrapper}
        ${style.feedItemWrapperDark} ${userBlacklisted && `hidden`}
      `}
    >
      <div className={style.feedItemInnerTop}>
        <div className={style.feedItemMetaWrapper}>
          <Link href={`/user/${username}`} passHref>
            <a
              href='dummy-href'
              className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}
            >
              {username}
            </a>
          </Link>
          <div className={style.feedItemMetaTimestamp}>
            <TimeAgo date={new Date(timestamp * 1000)} />
          </div>
        </div>
        <div className={`${style.feedItemText} ${style.feedItemTextDark}`}>
          {message}
        </div>
        <div className='flex pt-3'>
          {type !== 'replyToPost' && (
            <>
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
            </>
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
                  - Hide replies
                </button>
              )}
            </>
          )}
          {moderator && (
            <div className='group flex ml-3'>
              {showBlackListLabel && (
                <>
                  <SVGIcon
                    icon='faShieldAlt'
                    className={`
                        ${style.feedItemInteractionIcon}
                        ${style.feedItemInteractionIconDark}
                        hover:text-red-400 cursor-default
                        ${isLoading && ' animate-pulse text-green-600'}
                      `}
                  />
                  <button
                    type='button'
                    onClick={() => {
                      setAddUserToBlacklist()
                    }}
                    className={`${style.blackListButton}`}
                  >
                    Blacklist User
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      {openReplies && <div className={style.feedReplyItemOffset}>{replyItems}</div>}
      {parent && (
        <div className={style.feedItemInnerBottom}>
          <div className={style.feedItemInnerBottomCol}>
            {type === 'feed' && (
              <Link href={`/space/${spaceName}`} passHref>
                <a
                  href='dummy-href'
                  className={`${style.tag} ${style.tagClickable} ${style.tagClickableDark}`}
                >
                  #{spaceName}
                </a>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FeedItem
