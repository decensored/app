import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import SVGIcon from 'components/Icon/SVGIcon'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import useStore from 'lib/store'

interface SpaceItemProps {
  name: string
  owner: number
  numberOfPostsInSpace: number
}

const SpaceItem: FunctionComponent<SpaceItemProps> = ({
  name,
  owner,
  numberOfPostsInSpace,
}) => {
  const [userId] = useStore((state) => [state.userId])
  return (
    <Link href={`/space/${name}`} passHref>
      <div
        className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark} cursor-pointer`}
      >
        <div className={classNamesLib.feedItemInnerTop}>
          <div className={classNamesLib.feedItemMetaWrapper}>
            <span
              className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
            >
              <div className='flex'>
                {name}
                {owner === userId && (
                  <span
                    className={`${classNamesLib.tag} ${classNamesLib.tagClickable} cursor-default ml-3`}
                  >
                    Owner
                  </span>
                )}
              </div>
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
}

export default SpaceItem
