import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import {
  faComment,
  faShare,
  faShieldAlt,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const FeedItem: FunctionComponent = () => (
  <div className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark}`}>
    <div className={classNamesLib.feedItemInnerTop}>
      <div className={classNamesLib.feedItemMetaWrapper}>
        <Link href='/user/NameOfUser' passHref>
          <a
            href='dummy-href'
            className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
          >
            Username
          </a>
        </Link>
        <div className='text-sm text-right'>23 min</div>
      </div>
      <div className='break-words mt-2'>This is a super cool text.</div>
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
