import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { style } from 'styles/style'
import useStore from 'lib/store'
import Tag from 'components/Tags/Tag'

interface SpaceItemProps {
  name: string
  description: string
  owner: number
  numberOfPostsInSpace: number
}

const SpaceItem: FunctionComponent<SpaceItemProps> = ({ name, description, owner, numberOfPostsInSpace }) => {
  const [userId] = useStore((state) => [state.userId])
  return (
    <Link href={`/space/${name}`} passHref>
      <div className={`${style.feedItemWrapper} ${style.feedItemWrapperDark} cursor-pointer`}>
        <div className={style.feedItemInnerTop}>
          <div className={style.feedItemMetaWrapper}>
            <span className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}>
              <div className='flex items-center gap-x-3'>
                {name}
                {owner === userId && <Tag>Owner</Tag>}
              </div>
            </span>
            <div
              className='members pointer-events-none flex items-center
         justify-end gap-x-2'
            >
              <Tag clickable>
                <>
                  {numberOfPostsInSpace}
                  {numberOfPostsInSpace === 1 ? ' Post' : ' Posts'}
                </>
              </Tag>
            </div>
          </div>
          <div className={`${style.feedItemText} ${style.feedItemTextDark}`}>{description}</div>
        </div>
      </div>
    </Link>
  )
}

export default SpaceItem
