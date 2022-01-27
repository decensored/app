import React, { FunctionComponent } from 'react'
import shallow from 'zustand/shallow'
import Link from 'next/link'
import useStore from 'lib/store'
import { faComment, faShare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import TimeAgo from 'react-timeago'
import moment from 'moment'

interface FeedItemProps {
  username: string
  message: string
  timestamp: string
  type: string
  spaceName: string
}

const FeedItem: FunctionComponent<FeedItemProps> = ({
  username,
  message,
  timestamp,
  type,
  spaceName,
}) => {
  const [setIsOpenPostDialog] = useStore(
    (state) => [state.setIsOpenPostDialog],
    shallow
  )

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
            <TimeAgo date={moment(timestamp).format('YYYY-MM-DD HH:mm:ss')} />
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
          {/*         <FontAwesomeIcon
            icon={faShieldAlt}
            className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
          /> */}
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
