/* prettier-ignore */
import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faCircle,
  faCog,
  faComment,
  faExclamationTriangle,
  faHeart,
  faMinusSquare,
  faMoon,
  faPlus,
  faRedoAlt,
  faSatellite,
  faSatelliteDish,
  faShare,
  faShieldAlt,
  faSignOutAlt,
  faSpinner,
  faSun,
  faTimes,
  faUser,
  faUserAstronaut,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons'
import {
  faDiscord,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

interface SVGIconProps {
  icon: string
  className?: string
  isFixed?: boolean
  onClick?: () => void
}

const SVGIcon: FunctionComponent<SVGIconProps> = ({
  icon,
  className,
  isFixed = false,
  onClick,
}) => {
  const setIcon = (): IconProp => {
    if (icon === 'faBookmark') { return faBookmark}
    if (icon === 'faCircle') { return faCircle}
    if (icon === 'faCog') { return faCog}
    if (icon === 'faComment') { return faComment}
    if (icon === 'faExclamationTriangle') { return faExclamationTriangle}
    if (icon === 'faHeart') { return faHeart}
    if (icon === 'faMinusSquare') { return faMinusSquare}
    if (icon === 'faMoon') { return faMoon}
    if (icon === 'faPlus') { return faPlus}
    if (icon === 'faRedoAlt') { return faRedoAlt}
    if (icon === 'faSatellite') { return faSatellite}
    if (icon === 'faSatelliteDish') { return faSatelliteDish}
    if (icon === 'faShare') { return faShare}
    if (icon === 'faShieldAlt') { return faShieldAlt}
    if (icon === 'faSignOutAlt') { return faSignOutAlt}
    if (icon === 'faSpinner') { return faSpinner}
    if (icon === 'faSun') { return faSun}
    if (icon === 'faTimes') { return faTimes}
    if (icon === 'faUser') { return faUser}
    if (icon === 'faUserAstronaut') { return faUserAstronaut}
    if (icon === 'faUserPlus') { return faUserPlus}
    if (icon === 'faDiscord') { return faDiscord }
    if (icon === 'faGithub') { return faGithub }
    if (icon === 'faTwitter') { return faTwitter }

    return faCircle
  }

  return (
    <FontAwesomeIcon
      fixedWidth={isFixed}
      icon={setIcon()}
      className={className}
      onClick={onClick}
    />
  )
}

export default SVGIcon
