import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { faSatellite, faUserAstronaut } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNamesLib } from 'components/ClassNames/ClassNames'

interface SpaceItemProps {
  id: number
  name: string
}

const SpaceItem: FunctionComponent<SpaceItemProps> = ({ id, name }) => (
  <div
    key={id.toString()}
    className={`${classNamesLib.feedItemWrapper} ${classNamesLib.feedItemWrapperDark}`}
  >
    <div className={classNamesLib.feedItemInnerTop}>
      <div className={classNamesLib.feedItemMetaWrapper}>
        <Link href={`/space/${name}`} passHref>
          <a
            href='dummy-href'
            className={`${classNamesLib.feedItemMetaName} ${classNamesLib.feedItemMetaNameDark}`}
          >
            <FontAwesomeIcon icon={faSatellite} className='mr-2' /> {name}
          </a>
        </Link>
        <div
          className='members flex justify-end items-center
         gap-x-2 pointer-events-none'
        >
          <FontAwesomeIcon
            icon={faUserAstronaut}
            title='member'
            className='text-md text-gray-900 dark:text-gray-300'
          />
          <span
            className='flex-none uppercase bg-highlight-100 text-gray-600
            text-xs tracking-wide font-semibold px-2 py-1 rounded-md'
          >
            578
          </span>
        </div>
      </div>
      <div className='message break-words mt-2'>
        IOTA is a scalable, decentralized, feeless, modular, open-source
        distributed ledger protocol that goes beyond blockchain through its core
        invention of the blockless ‘Tangle’. The IOTA Tangle is a Directed
        Acyclic Graph (DAG). IOTA is aiming to be the backbone of the emerging
        machine-to-machine (m2m) economy of the Internet-of-Things (IoT), data
        integrity, micro-/nano- payments, and other cases where a scalable
        decentralized system adds value.
      </div>
    </div>
  </div>
)

export default SpaceItem
