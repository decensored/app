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
  authorIsBlacklisted?: boolean
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
  authorIsBlacklisted,
  replies,
  type,
  parent,
}) => {
  const [renderDialog, setRenderDialog] = React.useState(false)
  const [openReplyDialog, setOpenReplyDialog] = React.useState(false)
  const [openReplies, setOpenReplies] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [contract, userId, posts] = useStore(
    (state) => [state.contract, state.userId, state.posts],
    shallow
  )
  const [isSignedUp] = useStore((state) => [state.isSignedUp], shallow)

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
  const showBlackListLabel = !authorIsBlacklisted && author !== userId

  // Create list of Replies and check for blocked users
  let replyItems = []
  if (replies) {
    replyItems = replies
      .sort((a: any, b: any) => a.timestamp - b.timestamp)
      .map((post: any) => {
        // Get Replies for Post
        const repliesForPost = getRepliesForPost(posts, post.id)

        // check again if author of this post is blacklisted
        let replyAuthorIsBlacklisted = false
        if (blacklist) {
          replyAuthorIsBlacklisted =
            blacklist.filter((user: any) => user.userId === post.author)
              .length > 0
        }
        return (
          <FeedItem
            key={`post-${post.id}`}
            type='reply'
            replies={repliesForPost}
            moderator={false}
            parent={false}
            authorIsBlacklisted={replyAuthorIsBlacklisted}
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

  console.log(`${username} is blacklisted ${authorIsBlacklisted}`)

  return (
    <div
      className={`
        ${style.feedItemWrapper}
        ${style.feedItemWrapperDark}
        ${parent && style.feedItemParent}
        ${!parent && style.feedItemChild}
      `}
    >
      <div
        className={`${style.feedItemInnerTop} ${
          type === 'replyToPost' && 'pr-0'
        }`}
      >
        <div className={style.feedItemMetaWrapper}>
          {type === 'replyToPost' && (
            <div>
              <span
                className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}
              >
                {username}
              </span>
              <span className='mx-2'>in</span>
              <span
                className={`${style.tag} ${style.tagNotClickable} ${style.tagNotClickableDark}`}
              >
                {thisPost.spaceName}
              </span>
            </div>
          )}
          {type !== 'replyToPost' && (
            <div className='flex'>
              <Link href={`/user/${username}`} passHref>
                <a
                  href='dummy-href'
                  className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}
                >
                  {username}
                </a>
              </Link>
              {authorIsBlacklisted && (
                <span className='pl-2 pt-1 text-xs text-red-500'>BLOCKED</span>
              )}
            </div>
          )}
          <div className={style.feedItemMetaTimestamp}>
            <TimeAgo date={new Date(timestamp * 1000)} />
          </div>
        </div>
        <div className={`${style.feedItemText} ${style.feedItemTextDark}`}>
          {message}
        </div>
        <div className={style.feedReplyItemBar}>
          {type !== 'replyToPost' && isSignedUp && (
            <>
              <button
                type='button'
                onClick={() => {
                  setRenderDialog(true)
                  setOpenReplyDialog(true)
                }}
                className={style.feedReplyItemButton}
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
          {repliesExist && isSignedUp && (
            <span className={style.feedReplyItemSpacer}>|</span>
          )}
          {repliesExist && (
            <>
              {!openReplies && (
                <button
                  type='button'
                  onClick={() => {
                    setOpenReplies(true)
                  }}
                  className={style.feedReplyItemText}
                >
                  {replies.length === 1
                    ? `Show reply`
                    : `Show ${replies.length} replies`}
                </button>
              )}
              {openReplies && (
                <button
                  type='button'
                  onClick={() => {
                    setOpenReplies(false)
                  }}
                  className={style.feedReplyItemText}
                >
                  {replies.length === 1 ? `Hide reply` : `Hide replies`}
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
      {openReplies && (
        <div className={style.feedReplyItemOffset}>{replyItems}</div>
      )}
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
