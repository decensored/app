import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { getTrendingHashtags } from 'lib/storeUtils'
import Tag from 'components/Tags/Tag'
import { PostType } from 'lib/types'
import Tooltip from 'components/Tooltip/Tooltip'

interface TrendingHashtagsProps {
  posts: PostType[]
  classNames?: string
}

const TrendingHashtags: FunctionComponent<TrendingHashtagsProps> = ({ posts, classNames }) => {
  const hashtags = getTrendingHashtags(posts, 12, 1)

  const trendingTags = hashtags.map((tag: any) => (
    <Tooltip key={`trendingtag-${tag.tag}`} text={`${tag.tag} [${tag.count}]`} delayShow={1000}>
      <Link href={`/tag/${tag.tag}`} passHref>
        <a href='passed'>
          <Tag clickable ellipsis count={`[${tag.count}]`}>
            {tag.tag}
          </Tag>
        </a>
      </Link>
    </Tooltip>
  ))

  return <div className={classNames}>{trendingTags}</div>
}

export default TrendingHashtags
