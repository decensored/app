import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import Link from 'next/link'
import useStore from 'lib/store'
import {
  faComment,
  faMinusSquare,
  faShare,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import TimeAgo from 'react-timeago'
import { addUserToBlacklist, removeUserFromBlacklist } from 'api/spaces'
import { toast } from 'react-toastify'

interface FeedItemProps {
  author: number
  username: string
  message: string
  timestamp: number
  space: number
  spaceName: string
  type: string
  moderator: boolean
  blacklist?: any
  setBlacklist?: any
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
  setBlacklist,
}) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [setIsOpenPostDialog, contract] = useStore(
    (state) => [state.setIsOpenPostDialog, state.contract],
    shallow
  )

  // BLACKLIST STUFF
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

  const setRemoveUserFromBlacklist = async (): Promise<void> => {
    setIsLoading(true)
    const result = await removeUserFromBlacklist(contract, space, author)
    if (result.success) {
      toast.success(`User ${username} has access to this space again!`, {
        autoClose: 3000,
      })
      // Remove user from blacklistArray
      const newBlackList = blacklist.filter(
        (user: any) => user.userId !== author
      )
      setBlacklist(newBlackList)
      setIsLoading(false)
    } else {
      toast.error(`${result.error}`, {
        autoClose: 3000,
      })
      setIsLoading(false)
    }
  }

  return (
    <div
      className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark}`}
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
            <>
              <FontAwesomeIcon
                icon={faShieldAlt}
                className={`${classNamesLib.feedItemInteractionIcon} ${
                  classNamesLib.feedItemInteractionIconDark
                } ${isLoading && ' animate-pulse text-green-600'}`}
                onClick={() => {
                  setAddUserToBlacklist()
                }}
              />
              <FontAwesomeIcon
                icon={faMinusSquare}
                className={`${classNamesLib.feedItemInteractionIcon} ${
                  classNamesLib.feedItemInteractionIconDark
                } ${isLoading && ' animate-pulse text-green-600'}`}
                onClick={() => {
                  setRemoveUserFromBlacklist()
                }}
              />
            </>
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
          <FontAwesomeIcon
            icon={faComment}
            className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
            onClick={() => {
              setIsOpenPostDialog(true)
            }}
          />
          <FontAwesomeIcon
            icon={faShare}
            className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
          />
        </div>
      </div>
    </div>
  )
}

export default FeedItem
