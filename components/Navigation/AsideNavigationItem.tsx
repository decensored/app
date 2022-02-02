import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'
import SVGIcon from 'components/Icon/SVGIcon'

interface AsideNavigationItemProps {
  isActive: boolean
  icon: string
  name: string
}

const AsideNavigationItem: FunctionComponent<AsideNavigationItemProps> = ({ isActive, name, icon }) => (
  <div
    className={`
      ${style.navigationAsideButton}
      ${style.navigationAsideButtonDark}
      ${isActive ? style.navigationAsideButtonActive : ''}
    `}
  >
    <SVGIcon icon={icon} className={style.navigationAsideButtonIcon} isFixed />
    <span className={style.navigationAsideButtonText}>{name}</span>
  </div>
)

export default AsideNavigationItem
