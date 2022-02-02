import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { style } from 'styles/style'
import useStore from 'lib/store'

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
                {owner === userId && (
                  <span className={`${style.tag} ${style.tagNotClickable} ${style.tagNotClickableDark}`}>Owner</span>
                )}
              </div>
            </span>
            <div
              className='members pointer-events-none flex items-center
         justify-end gap-x-2'
            >
              <span
                className={`
                  ${style.tag}
                  ${style.tagNotClickable}
                  ${style.tagNotClickableDark}
                `}
              >
                {numberOfPostsInSpace}
                {numberOfPostsInSpace === 1 ? ' Post' : ' Posts'}
              </span>
            </div>
          </div>
          <div className={`${style.feedItemText} ${style.feedItemTextDark}`}>{description}</div>
        </div>
      </div>
    </Link>
  )
}

export default SpaceItem
