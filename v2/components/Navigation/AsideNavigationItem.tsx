import React, { FunctionComponent } from 'react'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import SVGIcon from 'components/Icon/SVGIcon'

interface AsideNavigationItemProps {
  isActive: boolean
  icon: string
  name: string
}

const AsideNavigationItem: FunctionComponent<AsideNavigationItemProps> = ({
  isActive,
  name,
  icon,
}) => (
  <span
    className={`
      ${classNamesLib.navigationAsideButton}
      ${classNamesLib.navigationAsideButtonDark}
      ${isActive ? classNamesLib.navigationAsideButtonActive : ''}
    `}
  >
    <SVGIcon
      icon={icon}
      classNames={classNamesLib.navigationAsideButtonIcon}
      isFixed
    />
    <span className={classNamesLib.navigationAsideButtonText}>{name}</span>
  </span>
)

export default AsideNavigationItem
