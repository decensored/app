import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import Link from 'next/link'
import type { PostType } from 'lib/types'
import useStore from 'lib/store'
import SVGIcon from 'components/Icon/SVGIcon'
import { style } from 'styles/style'
import { isBrowser } from 'react-device-detect'
import { addUserToBlacklist } from 'api/spaces'
import { deletePostOfUser } from 'api/feed'
import { toast } from 'react-toastify'
import ReplyDialog from 'components/Dialog/ReplyDialog'
import { getNumberOfRepliesForPostRecursive, getRepliesForPost } from 'lib/storeUtils'
import Tag from 'components/Tags/Tag'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'
import { Linkify, LinkifyCore } from 'react-easy-linkify'

LinkifyCore.PluginManager.enableHashtag()
LinkifyCore.PluginManager.enableMention()

TimeAgo.addDefaultLocale(en)

interface FeedItemProps {
  post: PostType
  moderator?: boolean
  blacklist?: any
  authorIsBlacklisted?: boolean
  replies?: any // or PostType[]
  nRepliesRecursive?: { total: number; read: number }
  type: string
  parent?: boolean
  depth?: number
}

const FeedItem: FunctionComponent<FeedItemProps> = ({
  post,
  moderator,
  blacklist,
  authorIsBlacklisted,
  replies,
  nRepliesRecursive,
  type,
  parent,
  depth = 0,
}) => {
  const {
    id,
    author,
    username,
    message,
    timestamp,
    space,
    spaceName,
    // mother_post,
    deleted,
    read,
  } = post

  const [renderDialog, setRenderDialog] = React.useState(false)
  const [openReplyDialog, setOpenReplyDialog] = React.useState(false)
  const [openReplies, setOpenReplies] = React.useState(depth <= 0)
  const [isLoading, setIsLoading] = React.useState(false)
  const [contract, userId, posts, setPosts] = useStore(
    (state) => [state.contract, state.userId, state.posts, state.setPosts],
    shallow
  )
  const [isSignedUp] = useStore((state) => [state.isSignedUp], shallow)

  if (!read && posts.length && type !== 'replyToPost') {
    /* eslint no-param-reassign: "off" */
    post.read = true
    setPosts(posts)
    // console.log(`post ${id} by ${username} (${message}) is now read`)
  }

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
  const replyCount = nRepliesRecursive?.total || replies?.length
  const replyCountRead = nRepliesRecursive?.read || 0
  const unReadReplies = replyCount - replyCountRead

  // Create list of Replies and check for blocked users
  let replyItems = []
  if (replies) {
    replyItems = replies
      .sort((a: any, b: any) => a.timestamp - b.timestamp)
      .map((reply: any) => {
        let replyAuthorIsBlacklisted = false // check again if author of this reply is blacklisted
        if (blacklist) {
          replyAuthorIsBlacklisted = blacklist.filter((user: any) => user.userId === reply.author).length > 0
        }
        return (
          <FeedItem
            key={`reply-${reply.id}`}
            type='reply'
            replies={getRepliesForPost(posts, reply.id)}
            nRepliesRecursive={getNumberOfRepliesForPostRecursive(posts, reply.id)}
            moderator={false}
            parent={false}
            depth={depth + 1}
            authorIsBlacklisted={replyAuthorIsBlacklisted}
            post={reply}
          />
        )
      })
  }

  // or can we now simply use 'post'
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
      const updatedPosts = posts.map((deletedPost) =>
        deletedPost.id === id ? { ...deletedPost, message: '', deleted: true } : deletedPost
      )
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
  const checkedMessage = /* deleted */ !message ? 'The user has removed this post!' : message

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
            <Link href={`/user/${username}`} passHref>
              <a href='passed' className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}>
                {username}
              </a>
            </Link>
            {parent && type === 'feed' && (
              <>
                <span>in</span>
                <Link href={`/space/${thisPost.spaceName}`} passHref>
                  <a href='passed'>
                    <Tag clickable>{thisPost.spaceName}</Tag>
                  </a>
                </Link>
              </>
            )}
            {authorIsBlacklisted && <span className='text-xs uppercase text-red-500'>blocked</span>}
          </div>

          <div className={style.feedItemMetaCol2}>
            <div className={style.feedItemMetaTimestamp}>
              <ReactTimeAgo
                date={new Date(timestamp * 1000 - 60000)}
                locale='en-US'
                timeStyle={isBrowser ? 'round' : 'twitter'}
              />
            </div>
          </div>
        </div>

        <div className={`${style.feedItemText} ${style.feedItemTextDark}`}>
          <Linkify
            options={{
              formatHref: {
                url: (value) => value.substr(0, 20),
                hashtag: (href) => `/tag/${href.substring(1)}`,
                mention: (href) => `/user/${href.substring(1)}`,
              },
              linkWrapper: {
                url: (props) => (
                  <span className={`${style.link} ${style.linkDark}`}>
                    <a {...props}>{props.children}</a>
                  </span>
                ),
                hashtag: (props) => (
                  <span className={`${style.linkify} ${style.linkifyHashtag} ${style.linkifyHashtagDark}`}>
                    <a {...props}>{props.children}</a>
                  </span>
                ),
                mention: (props) => (
                  <span className={`${style.linkify} ${style.linkifyMention} ${style.linkifyMentionDark}`}>
                    <a {...props}>{props.children}</a>
                  </span>
                ),
              },
            }}
          >
            {checkedMessage}
          </Linkify>
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
                <ReplyDialog showDialog={openReplyDialog} onClose={() => setOpenReplyDialog(false)} post={thisPost} />
              )}
            </>
          )}

          {replyCount > 0 && isSignedUp && <span className={style.feedReplyItemSpacer}>|</span>}

          {replyCount > 0 && (
            <>
              {!openReplies && (
                <button
                  type='button'
                  onClick={() => {
                    setOpenReplies(true)
                  }}
                  className={style.feedReplyItemText}
                >
                  {replyCount === 1 ? `Show Reply` : `Show ${replyCount} Replies`}{' '}
                  {unReadReplies > 0 && `(${unReadReplies} new)`}
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
                  {replyCount === 1 ? `Hide Reply` : `Hide ${replyCount} Replies`}{' '}
                  {unReadReplies > 0 && `(${unReadReplies} new)`}
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
      {openReplies && <div className={`${style.feedReplyItemWrapper} ${style.feedItemReset}`}>{replyItems}</div>}
    </div>
  )
}

export default FeedItem
