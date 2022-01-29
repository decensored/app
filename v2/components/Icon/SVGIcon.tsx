import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faCircle,
  faHeart,
  faMoon,
  faPlus,
  faSatellite,
  faSatelliteDish,
  faSun,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface SVGIconProps {
  icon: string
  classNames: string
  isFixed: boolean
}

const SVGIcon: FunctionComponent<SVGIconProps> = ({
  icon,
  classNames,
  isFixed,
}) => {
  const setIcon = (): IconProp => {
    if (icon === 'faBookmark') { return faBookmark }
    if (icon === 'faHeart') { return faHeart }
    if (icon === 'faMoon') { return faMoon }
    if (icon === 'faPlus') { return faPlus }
    if (icon === 'faSatellite') { return faSatellite }
    if (icon === 'faSatelliteDish') { return faSatelliteDish }
    if (icon === 'faSun') { return faSun }
    if (icon === 'faUserAstronaut') { return faUserAstronaut }
    return faCircle
  }

  return (
    <FontAwesomeIcon
      fixedWidth={isFixed}
      icon={setIcon()}
      className={classNames}
    />
  )
}

export default SVGIcon
