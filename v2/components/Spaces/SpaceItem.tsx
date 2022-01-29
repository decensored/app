import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import SVGIcon from 'components/Icon/SVGIcon'
import { classNamesLib } from 'components/ClassNames/ClassNames'

interface SpaceItemProps {
  name: string
  numberOfPostsInSpace: number
}

const SpaceItem: FunctionComponent<SpaceItemProps> = ({
  name,
  numberOfPostsInSpace,
}) => (
  <Link href={`/space/${name}`} passHref>
    <div
      className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark} cursor-pointer`}
    >
      <div className={classNamesLib.feedItemInnerTop}>
        <div className={classNamesLib.feedItemMetaWrapper}>
          <span
            className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
          >
            <SVGIcon icon='faSatellite' className='mr-2' /> {name}
          </span>
          <div
            className='members flex justify-end items-center
         gap-x-2 pointer-events-none'
          >
            <SVGIcon
              icon='faUserAstronaut'
              className='text-md text-gray-900 dark:text-gray-300'
            />
            <span
              className={`
              ${classNamesLib.tag}
              ${classNamesLib.tagNotClickable}
              ${classNamesLib.tagNotClickableDark}
            `}
            >
              {numberOfPostsInSpace}
            </span>
          </div>
        </div>
        <div
          className={`${classNamesLib.feedItemText} ${classNamesLib.feedItemTextDark}`}
        >
          IOTA is a scalable, decentralized, feeless, modular, open-source
          distributed ledger protocol that goes beyond blockchain through its
          core invention of the blockless Tangle.
        </div>
      </div>
    </div>
  </Link>
)

export default SpaceItem
