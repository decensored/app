import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { getTrendingHashtags } from 'lib/storeUtils'
import Tag from 'components/Tags/Tag'
import Tooltip from 'components/Tooltip/Tooltip'
import useStore from 'lib/store'

interface TrendingHashtagsProps {
  classNames?: string
}

const TrendingHashtags: FunctionComponent<TrendingHashtagsProps> = ({ classNames }) => {
  const [posts] = useStore((state) => [state.posts])
  const hashtags = getTrendingHashtags(posts, 24, 3)

  const trendingTags = hashtags.map((tag: any) => (
    <Tooltip key={`trendingtag-${tag.tag}`} text={`${tag.tag} [${tag.count}]`} delayShow={1000}>
      <Link href={`/tag/${tag.tag}`} passHref>
        <a href='passed'>
          <Tag clickable ellipsis count={`[${tag.count}]`}>
            #{tag.tag}
          </Tag>
        </a>
      </Link>
    </Tooltip>
  ))

  return trendingTags ? (
    <>
      <div className='mb-2 text-sm font-medium'>Currently trending</div>
      <div className={classNames}>{trendingTags}</div>
    </>
  ) : null
}

export default TrendingHashtags
