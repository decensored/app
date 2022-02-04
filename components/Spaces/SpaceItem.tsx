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
            <div className={style.feedItemMetaCol1}>
              <span className={`${style.feedItemMetaName} ${style.feedItemMetaNameDark}`}>
                <span>{name}</span>
              </span>
              {owner === userId && <Tag>Owner</Tag>}
            </div>
            <div className={style.feedItemMetaCol2}>
              <Tag>
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
