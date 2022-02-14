import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import Link from 'next/link'
import type { PostType } from 'lib/types'
import useStore from 'lib/store'
import Icon from 'components/Icons/Icon'
import { style } from 'styles/style'
import { isBrowser } from 'react-device-detect'
import { addUserToBlacklist } from 'api/spaces'
import { deletePostOfUser } from 'api/feed'
import { toast } from 'react-toastify'
import ReplyDialog from 'components/Dialog/ReplyDialog'
import { getNumberOfRepliesForPostRecursive, getRepliesForPost } from 'lib/storeUtils'
import spacePlugin from 'lib/linkify/spacePlugin'
import Tooltip from 'components/Tooltip/Tooltip'
import Tag from 'components/Tags/Tag'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ReactTimeAgo from 'react-time-ago'
import { Linkify, LinkifyCore } from 'react-easy-linkify'
import { inBrowser } from 'lib/where'
import useScreenSizeQuery from 'hooks/useScreenSizeQuery.js'

LinkifyCore.PluginManager.addPlugin(spacePlugin)
LinkifyCore.PluginManager.enableHashtag()
LinkifyCore.PluginManager.enableMention()

TimeAgo.addDefaultLocale(en)

interface FeedItemProps {
  post: PostType
  moderator?: boolean
  blacklist?: any
  authorIsBlacklisted?: boolean
  // replies?: any // or PostType[]
  // nRepliesRecursive?: { total: number; read: number }
  type: string
  parent?: boolean
  depth?: number
}

const FeedItem: FunctionComponent<FeedItemProps> = ({
  post,
  moderator,
  blacklist,
  authorIsBlacklisted,
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
    setPosts(posts) // XXX hack
    // console.log(`post ${id} by ${username} (${message}) is now read`)
  }

  const isSmallerThanSM = useScreenSizeQuery('isSmallerThanSM')

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
  const isAuthor = author === userId && isSignedUp

  const replies = getRepliesForPost(posts, post.id) // XXX or in useEffect?
  const nRepliesRecursive = getNumberOfRepliesForPostRecursive(posts, post.id) // XXX or in useEffect?
  const replyCount = nRepliesRecursive?.total || replies?.length
  const replyCountRead = nRepliesRecursive?.read || 0
  const unReadReplies = replyCount - replyCountRead

  // Create list of Replies and check for blocked users
  let replyItems = [] as any[]
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
                    <Tag clickable>{`/${thisPost.spaceName}`}</Tag>
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
                hashtag: (href: string) => `/tag/${href.substring(1).toLowerCase()}`,
                mention: (href: string) => `/user/${href.substring(1)}`,
                space: (href: string) => `/space/${href.substring(1)}`,
              } as any,
              linkWrapper: {
                url: (props: any) => (
                  <span className={`${style.link} ${style.linkDark}`}>
                    <a {...props}>{props.children}</a>
                  </span>
                ),
                hashtag: (props: any) => (
                  <span className={`${style.linkify} ${style.linkifyHashtag} ${style.linkifyHashtagDark}`}>
                    <a {...props}>{props.children}</a>
                  </span>
                ),
                mention: (props: any) => (
                  <span className={`${style.linkify} ${style.linkifyMention} ${style.linkifyMentionDark}`}>
                    <a {...props}>{props.children}</a>
                  </span>
                ),
                space: (props: any) => (
                  <span className={`${style.linkify} ${style.linkifySpace} ${style.linkifySpaceDark}`}>
                    <a {...props}>{props.children}</a>
                  </span>
                ),
              } as any,
            }}
          >
            {checkedMessage}
          </Linkify>
        </div>
        {type !== 'replyToPost' && !authorIsBlacklisted && (
          <div
            className={`
            ${style.feedReplyItemBar}
          `}
          >
            <Tooltip
              classNames={`${!isSignedUp ? 'disabled-link' : ''}`}
              text={`${!isSignedUp ? 'You need to register first.' : 'Reply'}`}
            >
              <button
                type='button'
                onClick={() => {
                  setRenderDialog(true)
                  setOpenReplyDialog(true)
                }}
              >
                <Icon
                  icon='faComment'
                  className={`
                    ${style.feedItemInteractionIcon}
                    ${style.feedItemInteractionIconDark}
                  `}
                />
              </button>
            </Tooltip>
            {renderDialog && (
              <ReplyDialog showDialog={openReplyDialog} onClose={() => setOpenReplyDialog(false)} post={thisPost} />
            )}

            {!openReplies && (
              <Tooltip
                classNames={`${replyCount === 0 ? 'disabled-link' : ''}`}
                text={`${replyCount === 0 ? 'No Replies' : 'Open Replies'}`}
              >
                <button
                  type='button'
                  onClick={() => {
                    setOpenReplies(true)
                  }}
                  className='relative'
                >
                  {unReadReplies > 0 && (
                    <span className={`${style.feedReplyItemButtonCount} ${style.feedReplyItemButtonCountDark}`}>
                      {unReadReplies}
                    </span>
                  )}

                  <Icon
                    icon='faEye'
                    className={`
                        ${style.feedItemInteractionIcon}
                        ${style.feedItemInteractionIconDark}
                      `}
                  />
                </button>
              </Tooltip>
            )}

            {openReplies && (
              <Tooltip
                classNames={`${replyCount === 0 ? 'disabled-link' : ''}`}
                text={`${replyCount === 0 ? 'No Replies' : 'Hide Replies'}`}
              >
                <button
                  type='button'
                  onClick={() => {
                    setOpenReplies(false)
                  }}
                  className={`
                  ${replyCount === 0 ? 'pointer-events-none opacity-30' : ''}
                  relative
                `}
                >
                  {/* {unReadReplies > 0 && (
                  <span className={`${style.feedReplyItemButtonCount} ${style.feedReplyItemButtonCountDark}`}>
                    {unReadReplies}
                  </span>
                )} */}

                  <Icon
                    icon='faEyeSlash'
                    className={`
                      ${style.feedItemInteractionIcon}
                      ${style.feedItemInteractionIconDark}
                    `}
                  />
                </button>
              </Tooltip>
            )}

            <Tooltip text='Share Post'>
              <Link href={`${inBrowser ? window.origin : ''}/post/${thisPost.id}`} passHref>
                <a href='passed' target='_blank' rel='noreferrer'>
                  <Icon
                    icon='faShare'
                    className={`
                      ${style.feedItemInteractionIcon}
                      ${style.feedItemInteractionIconDark}
                    `}
                  />
                </a>
              </Link>
            </Tooltip>

            {isAuthor && !deleted && (
              <button
                type='button'
                onClick={() => {
                  deletePost()
                }}
              >
                <Tooltip text='Delete'>
                  <Icon
                    icon='faTrash'
                    className={`
                        ${style.feedItemInteractionIcon}
                        ${style.feedItemInteractionIconDark}
                      hover:text-red-400
                      `}
                  />
                </Tooltip>
              </button>
            )}

            {moderator && showBlackListLabel && (
              <button
                type='button'
                onClick={() => {
                  setAddUserToBlacklist()
                }}
              >
                <Tooltip text='Blacklist User'>
                  <Icon
                    icon='faShieldAlt'
                    className={`
                        ${style.feedItemInteractionIcon}
                        ${style.feedItemInteractionIconDark}
                      hover:text-red-400
                      `}
                  />
                </Tooltip>
              </button>
            )}
          </div>
        )}
      </div>
      {openReplies && <div className={`${style.feedReplyItemWrapper} ${style.feedItemReset}`}>{replyItems}</div>}
    </div>
  )
}

export default FeedItem
