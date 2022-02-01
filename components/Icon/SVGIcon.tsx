import React, { FunctionComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark,
  faCheck,
  faCircle,
  faClipboard,
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

const iconLookup: { [unit: string]: IconProp } = {
  faBookmark: faBookmark,
  faCheck: faCheck,
  faCircle: faCircle,
  faClipboard: faClipboard,
  faCog: faCog,
  faComment: faComment,
  faExclamationTriangle: faExclamationTriangle,
  faHeart: faHeart,
  faMinusSquare: faMinusSquare,
  faMoon: faMoon,
  faPlus: faPlus,
  faRedoAlt: faRedoAlt,
  faSatellite: faSatellite,
  faSatelliteDish: faSatelliteDish,
  faShare: faShare,
  faShieldAlt: faShieldAlt,
  faSignOutAlt: faSignOutAlt,
  faSpinner: faSpinner,
  faSun: faSun,
  faTimes: faTimes,
  faUser: faUser,
  faUserAstronaut: faUserAstronaut,
  faUserPlus: faUserPlus,
  faDiscord: faDiscord,
  faGithub: faGithub,
  faTwitter: faTwitter,
}

const SVGIcon: FunctionComponent<SVGIconProps> = ({
  icon,
  className,
  isFixed = false,
  onClick,
}) => {
  const setIcon = (): IconProp => {
    const getIcon = iconLookup[icon]
    if (!getIcon) console.warn(`${icon} undefined`)
    return getIcon
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
