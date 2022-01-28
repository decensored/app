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
  username: string
  message: string
  timestamp: number
  type: string
  owner: boolean
  spaceName: string
}

const FeedItem: FunctionComponent<FeedItemProps> = ({
  username,
  message,
  timestamp,
  type,
  owner,
  spaceName,
}) => {
  const [setIsOpenPostDialog, contract] = useStore(
    (state) => [state.setIsOpenPostDialog, state.contract],
    shallow
  )

  // BLACKLIST STUFF
  const setAddUserToBlacklist = async (): Promise<void> => {
    const result = await addUserToBlacklist(contract, spaceName, username)
    if (result.success) {
      toast.success(`User ${username} has been blacklisted for this space!`, {
        autoClose: 5000,
      })
    } else {
      toast.error(`${result.error}`, {
        autoClose: 5000,
      })
    }
  }

  const setRemoveUserFromBlacklist = async (): Promise<void> => {
    const result = await removeUserFromBlacklist(contract, spaceName, username)
    if (result.success) {
      toast.success(`User ${username} has access to this space again!`, {
        autoClose: 5000,
      })
    } else {
      toast.error(`${result.error}`, {
        autoClose: 5000,
      })
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
          {owner && (
            <>
              <FontAwesomeIcon
                icon={faShieldAlt}
                className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
                onClick={() => {
                  setAddUserToBlacklist()
                }}
              />
              <FontAwesomeIcon
                icon={faMinusSquare}
                className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
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
