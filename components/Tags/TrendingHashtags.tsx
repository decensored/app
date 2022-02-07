import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import { getTrendingHashtags } from 'lib/storeUtils'
import Tag from 'components/Tags/Tag'
import { PostType } from 'lib/types'

interface TrendingHashtagsProps {
  posts: PostType[]
}

const TrendingHashtags: FunctionComponent<TrendingHashtagsProps> = ({ posts }) => {
  const hashtags = getTrendingHashtags(posts, 12, 1)

  const trendingTags = hashtags.map((tag: any) => (
    <Link href={`/tag/${tag.tag}`} passHref>
      <a href='passed'>
        <Tag clickable>
          {tag.tag} [{tag.count}]
        </Tag>
      </a>
    </Link>
  ))

  return trendingTags
}

export default TrendingHashtags
