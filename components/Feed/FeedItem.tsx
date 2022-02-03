import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import Link from 'next/link'
import useStore from 'lib/store'
import SVGIcon from 'components/Icon/SVGIcon'
import { style } from 'styles/style'
import TimeAgo from 'react-timeago'
import { addUserToBlacklist } from 'api/spaces'
import { deletePostOfUser } from 'api/feed'
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
  depth?: number
  deleted: boolean
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
  depth = 0,
  deleted,
}) => {
  const [renderDialog, setRenderDialog] = React.useState(false)
  const [openReplyDialog, setOpenReplyDialog] = React.useState(false)
  const [openReplies, setOpenReplies] = React.useState(depth <= 0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [contract, userId, posts, setPosts] = useStore(
    (state) => [state.contract, state.userId, state.posts, state.setPosts],
    shallow
  )
  const [isSignedUp] = useStore((state) => [state.isSignedUp], shallow)

  // Blacklist
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
  const isAuthor = author === userId

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
          replyAuthorIsBlacklisted = blacklist.filter((user: any) => user.userId === post.author).length > 0
        }
        return (
          <FeedItem
            key={`post-${post.id}`}
            type='reply'
            replies={repliesForPost}
            moderator={false}
            parent={false}
            depth={depth + 1}
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
    deleted,
  }

  // Post Deletion
  const deletePost = async (): Promise<void> => {
    const result = await deletePostOfUser(contract, id)
    if (result.success) {
      const updatedPosts = posts.map((post) => (post.id === id ? { ...post, message: '', deleted: true } : post))
      setPosts(updatedPosts)
      toast.success(`Your post has been deleted!`, {
        autoClose: 3000,
      })
    } else {
      toast.error(`${result.error}`, {
        autoClose: 3000,
      })
    }
  }
  const checkedMessage = deleted ? 'The user has removed this post!' : message

  return (
    <div
      className={`
        ${style.feedItemWrapper}
        ${style.feedItemWrapperDark}
        ${parent ? `${style.feedItemParent}` : `${style.feedItemChild}`}
      `}
    >
      <div
        className={`
        ${style.feedItemInnerTop}
        ${type === 'replyToPost' ? 'pr-0' : ''}
      `}
      >
        <div className={style.feedItemMetaWrapper}>
          <div className={style.feedItemMetaCol1}>
            <span className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}>{username}</span>
            {parent && type === 'feed' && (
              <>
                <span>in</span>
                <Link href={`/space/${thisPost.spaceName}`} passHref>
                  <span className={`${style.tag} ${style.tagClickable} ${style.tagClickableDark}`}>
                    {thisPost.spaceName}
                  </span>
                </Link>
              </>
            )}
            {authorIsBlacklisted && <span className='text-xs uppercase text-red-500'>blocked</span>}
          </div>
          <div className={style.feedItemMetaCol2}>
            <div className={style.feedItemMetaTimestamp}>
              <TimeAgo date={new Date(timestamp * 1000)} />
            </div>
          </div>
        </div>
        <div className={`${style.feedItemText} ${style.feedItemTextDark}`}>{checkedMessage}</div>
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
                <ReplyDialog showDialog={openReplyDialog} onClose={() => setOpenReplyDialog(false)} post={thisPost} />
              )}
            </>
          )}
          {repliesExist && isSignedUp && <span className={style.feedReplyItemSpacer}>|</span>}
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
                  {replies.length === 1 ? `Show Reply` : `Show ${replies.length} Replies`}
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
                  {replies.length === 1 ? `Hide Reply` : `Hide Replies`}
                </button>
              )}
            </>
          )}
          {isAuthor && !deleted && (
            <>
              <span className={style.feedReplyItemSpacer}>|</span>
              <button
                type='button'
                onClick={() => {
                  deletePost()
                }}
                className={style.feedReplyItemText}
              >
                Delete Post
              </button>
            </>
          )}
          {moderator && (
            <div className='group ml-3 flex'>
              {showBlackListLabel && (
                <>
                  <SVGIcon
                    icon='faShieldAlt'
                    className={`
                        ${style.feedItemInteractionIcon}
                        ${style.feedItemInteractionIconDark}
                        cursor-default hover:text-red-400
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
    </div>
  )
}

export default FeedItem
