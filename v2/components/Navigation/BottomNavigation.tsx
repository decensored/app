import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  faSatellite,
  faSatelliteDish,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const Bottombar: FunctionComponent = () => {
  const router = useRouter()
  const { pathname } = router

  let tabIndex = -1
  if (pathname === '/') tabIndex = 0
  else if (pathname.startsWith('/space')) tabIndex = 1
  else if (pathname.startsWith('/user/')) tabIndex = 2
  // console.log(pathname, tabIndex)

  const isSignedUp = useStore((state) => state.isSignedUp)

  return (
    <div
      className={`
        ${classNamesLib.navigationBottomWrapper}
        ${classNamesLib.navigationBottomWrapperDark}
      `}
    >
      <div className={classNamesLib.container}>
        <div className={classNamesLib.navigationBottomInner}>
          <Link href='/' passHref>
            <span
              className={`
                ${classNamesLib.navigationBottomItem}
                ${
                  tabIndex === 0
                    ? classNamesLib.navigationBottomItemColorActive
                    : classNamesLib.navigationBottomItemColor
                }
              `}
            >
              <FontAwesomeIcon icon={faSatelliteDish} />
              <span className={classNamesLib.navigationBottomItemText}>
                <span className='hidden sm:inline'>Feed</span>
                {tabIndex === 0 && (
                  <motion.span
                    className={`
                      ${classNamesLib.navigationBottomMotionSpan}
                      ${classNamesLib.navigationBottomMotionSpanColor}
                      ${classNamesLib.navigationBottomMotionSpanColorDark}
                    `}
                    layoutId='activeTab'
                  />
                )}
              </span>
            </span>
          </Link>
          <Link href='/spaces' passHref>
            <span
              className={`
                ${classNamesLib.navigationBottomItem}
                ${
                  tabIndex === 1
                    ? classNamesLib.navigationBottomItemColorActive
                    : classNamesLib.navigationBottomItemColor
                }
              `}
            >
              <FontAwesomeIcon icon={faSatellite} />
              <span className={classNamesLib.navigationBottomItemText}>
                <span className='hidden sm:inline'>Spaces</span>
                {tabIndex === 1 && (
                  <motion.span
                    className={`
                      ${classNamesLib.navigationBottomMotionSpan}
                      ${classNamesLib.navigationBottomMotionSpanColor}
                      ${classNamesLib.navigationBottomMotionSpanColorDark}
                    `}
                    layoutId='activeTab'
                  />
                )}
              </span>
            </span>
          </Link>
          {isSignedUp && (
            <Link href='/user/MrSupertramp' passHref>
              <span
                className={`
                  ${classNamesLib.navigationBottomItem}
                  ${
                    tabIndex === 2
                      ? classNamesLib.navigationBottomItemColorActive
                      : classNamesLib.navigationBottomItemColor
                  }
                `}
              >
                <FontAwesomeIcon icon={faUserAstronaut} />
                <span className={classNamesLib.navigationBottomItemText}>
                  <span className='hidden sm:inline'>My Posts</span>
                  {tabIndex === 2 && (
                    <motion.span
                      className={`
                        ${classNamesLib.navigationBottomMotionSpan}
                        ${classNamesLib.navigationBottomMotionSpanColor}
                        ${classNamesLib.navigationBottomMotionSpanColorDark}
                      `}
                      layoutId='activeTab'
                    />
                  )}
                </span>
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bottombar
