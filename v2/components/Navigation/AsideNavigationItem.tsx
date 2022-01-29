import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface AsideNavigationItemProps {
  isActive: boolean
  faIcon: IconProp
  name: string
}

const AsideNavigationItem: FunctionComponent<AsideNavigationItemProps> = ({
  isActive,
  name,
  faIcon
}) => (
  <span
    className={`
      ${classNamesLib.navigationAsideButton}
      ${classNamesLib.navigationAsideButtonDark}
      ${
        isActive
          ? classNamesLib.navigationAsideButtonActive
          : ''
      }
    `}
  >
    <FontAwesomeIcon
      fixedWidth
      icon={faIcon}
      className={classNamesLib.navigationAsideButtonIcon}
    />
    <span className={classNamesLib.navigationAsideButtonText}>
      {name}
    </span>
  </span>
)

export default AsideNavigationItem
