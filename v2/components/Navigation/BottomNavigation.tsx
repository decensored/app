import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import PostDialog from 'components/Dialog/PostDialog'

const BottomNavigation: FunctionComponent = () => {
  const [openPostDialog, setOpenPostDialog] = useState(false)
  const router = useRouter()
  const { pathname } = router

  let tabIndex = -1
  if (pathname === '/') tabIndex = 0
  else if (pathname.startsWith('/spaces')) tabIndex = 1

  const [isSignedUp] = useStore((state) => [
    state.isSignedUp,
    state.userName,
  ])

  return (
    <div
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
              ${
                tabIndex === 0
                  ? classNamesLib.navigationBottomItemColorActive
                  : classNamesLib.navigationBottomItemColor
              }
            `}
          >
            <SVGIcon icon='faSatelliteDish' />
            <span className={classNamesLib.navigationBottomItemText}>
              <span className='hidden sm:inline'>Feed</span>
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
          <>
            <span
              className={`${classNamesLib.navigationBottomItem}`}
            >
              <SVGIcon
                icon='faPlus'
                onClick={() => setOpenPostDialog(true)}
              />
            </span>
            <PostDialog
              showDialog={openPostDialog}
              onClose={() => setOpenPostDialog(false)}
            />
          </>
        )}

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
            <SVGIcon icon='faSatellite' />
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
      </div>
    </div>
  )
}

export default BottomNavigation
