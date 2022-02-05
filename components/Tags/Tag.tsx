import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'

interface TagProps {
  clickable?: boolean
  hover?: boolean
  classNames?: string
  children: string | JSX.Element[] | JSX.Element
}

const Tag: FunctionComponent<TagProps> = ({ children, classNames, clickable, hover }) => (
  <span
    className={`
    ${style.tag}
    ${style.tagDark}
    ${clickable ? `${style.tagClickable}` : ''}
    ${hover ? `${style.tagHover}` : ''}
    ${classNames ? `${classNames}` : ''}
  `}
  >
    <span>{children}</span>
  </span>
)

export default Tag
