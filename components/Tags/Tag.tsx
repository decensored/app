import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'

interface TagProps {
  clickable?: boolean
  classNames?: string
  ellipsis?: boolean
  count?: string
  children: string | JSX.Element[] | JSX.Element
}

const Tag: FunctionComponent<TagProps> = ({ clickable, classNames, ellipsis, count, children }) => (
  <span
    className={`
    ${style.tag}
    ${style.tagDark}
    ${clickable ? `${style.tagClickable}` : ''}
    ${classNames ? `${classNames}` : ''}
  `}
  >
    <span className={`${ellipsis ? `${style.tagEllipsis}` : ''}`}>
      <span className={`${count ? '' : ''}`}>{children}</span>
      {count && <div className={`${style.tagCount} ${style.tagCountDark}`}>{count}</div>}
    </span>
  </span>
)

export default Tag
