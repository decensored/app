import React, { FunctionComponent, useState } from 'react'
import shallow from 'zustand/shallow'
import Link from 'next/link'
import useStore from 'lib/store'
import SVGIcon from 'components/Icon/SVGIcon'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import TimeAgo from 'react-timeago'
import { addUserToBlacklist } from 'api/spaces'
import { toast } from 'react-toastify'
import PostDialog from 'components/Dialog/PostDialog'

interface FeedItemProps {
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
}

const FeedItem: FunctionComponent<FeedItemProps> = ({
  author,
  username,
  message,
  timestamp,
  space,
  spaceName,
  type,
  moderator,
  blacklist,
  userBlacklisted,
}) => {
  const [openPostDialog, setOpenPostDialog] = useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [contract, userId] = useStore(
    (state) => [state.contract, state.userId],
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

  return (
    <>
      <div
        className={`${classNamesLib.feedItemWrapper} ${
          classNamesLib.feedItemWrapperDark
        } ${userBlacklisted && `hidden`}`}
      >
        <div className={classNamesLib.feedItemInnerTop}>
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
        </div>
        <div className={classNamesLib.feedItemInnerBottom}>
          <div className={classNamesLib.feedItemInnerBottomCol}>
            {moderator && (
              <div className='group flex'>
                {showBlackListLabel && (
                  <>
                    <SVGIcon
                      icon='faShieldAlt'
                      className={`
                        ${classNamesLib.feedItemInteractionIcon}
                        ${classNamesLib.feedItemInteractionIconDark}
                        hover:text-red-400 cursor-default
                        ${isLoading && ' animate-pulse text-green-600'}
                      `}
                    />
                    <button
                      type='button'
                      onClick={() => {
                        setAddUserToBlacklist()
                      }}
                      className={`${classNamesLib.blackListButton}`}
                    >
                      Blacklist User
                    </button>
                  </>
                )}
              </div>
            )}
            {type === 'feed' && (
              <Link href={`/space/${spaceName}`} passHref>
                <a
                  href='dummy-href'
                  className={`${classNamesLib.tag} ${classNamesLib.tagClickable} ${classNamesLib.tagClickableDark}`}
                >
                  #{spaceName}
                </a>
              </Link>
            )}
          </div>
          <div className={classNamesLib.feedItemInnerBottomCol}>
            <SVGIcon
              icon='faComment'
              className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
              onClick={() => setOpenPostDialog(true)}
            />
            <SVGIcon
              icon='faShare'
              className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
            />
          </div>
        </div>
      </div>
      {/* <PostDialog
        showDialog={openPostDialog}
        onClose={() => setOpenPostDialog(false)}
      /> */}
    </>
  )
}

export default FeedItem
