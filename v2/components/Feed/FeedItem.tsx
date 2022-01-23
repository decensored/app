import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import {
  faComment,
  faShare,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNamesLib } from 'components/ClassNames/ClassNames'

interface RegisterProps {
  username: string
  message: string
  timestamp: string
}

const FeedItem: FunctionComponent<RegisterProps> = ({
  username,
  message,
  timestamp,
}) => (
  <div
    className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark}`}
  >
    <div className={classNamesLib.feedItemInnerTop}>
      <div className={classNamesLib.feedItemMetaWrapper}>
        <Link href='/user/NameOfUser' passHref>
          <a
            href='dummy-href'
            className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
          >
            {username}
          </a>
        </Link>
        <div className='text-sm text-right'>{timestamp}</div>
      </div>
      <div className='break-words mt-2'>{message}</div>
    </div>
    <div className={classNamesLib.feedItemInnerBottom}>
      <div className='flex gap-x-3 items-center'>
        <FontAwesomeIcon
          icon={faShieldAlt}
          className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
        />
      </div>
      <div className='flex gap-x-3 items-center'>
        <FontAwesomeIcon
          icon={faComment}
          className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
        />
        <FontAwesomeIcon
          icon={faShare}
          className={`${classNamesLib.feedItemInteractionIcon} ${classNamesLib.feedItemInteractionIconDark}`}
        />
      </div>
    </div>
  </div>
)

export default FeedItem
