import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import {
  faSatellite,
  faSatelliteDish,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from '../../lib/store'
import { classNamesLib } from '../ClassNames/Lib'

const Bottombar: FunctionComponent = () => {
  const isSignedUp = useStore((state) => state.isSignedUp)

  return (
    <nav
      className={`
        ${classNamesLib.navigationBottomWrapper}
        ${classNamesLib.navigationBottomWrapperDark}
      `}
    >
      <div className={classNamesLib.navigationBottomInner}>
        <Link href='/' passHref>
          <span
            className={`
              ${classNamesLib.navigationBottomItem}
              ${classNamesLib.navigationBottomItemDark}
            `}
          >
            <FontAwesomeIcon icon={faSatelliteDish} />
            <span className={classNamesLib.navigationBottomItemText}>Feed</span>
          </span>
        </Link>
        <Link href='/spaces' passHref>
          <span
            className={`
              ${classNamesLib.navigationBottomItem}
              ${classNamesLib.navigationBottomItemDark}
            `}
          >
            <FontAwesomeIcon icon={faSatellite} />
            <span className={classNamesLib.navigationBottomItemText}>
              Spaces
            </span>
          </span>
        </Link>
        {isSignedUp && (
          <Link href='/user/MrSupertramp' passHref>
            <span
              className={`
                ${classNamesLib.navigationBottomItem}
                ${classNamesLib.navigationBottomItemDark}
              `}
            >
              <FontAwesomeIcon icon={faUserAstronaut} />
              <span className={classNamesLib.navigationBottomItemText}>
                My Posts
              </span>
            </span>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Bottombar
