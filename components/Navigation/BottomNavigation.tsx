import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SVGIcon from 'components/Icon/SVGIcon'
import { style } from 'styles/style'
import useScreenSizeQuery from 'hooks/useScreenSizeQuery.js'
import BottomButtonCreatePost from './BottomButtonCreatePost'

const BottomNavigation = () => {
  const { pathname } = useRouter()

  const isRoot = pathname === '/'
  const isSpaces = pathname.startsWith('/spaces')

  const isSmallerThanMD = useScreenSizeQuery('isSmallerThanMD')

  return isSmallerThanMD ? (
    <div
      className={`
        ${style.navigationBottomWrapper}
        ${style.navigationBottomWrapperDark}
      `}
    >
      <div className={style.navigationBottomWrapperBorder} />
      <div className={style.navigationBottomInner}>
        <Link href='/' passHref>
          <span
            className={`
              ${style.navigationBottomItem}
              ${isRoot ? style.navigationBottomItemColorActive : style.navigationBottomItemColor}
            `}
          >
            <SVGIcon icon='faSatelliteDish' />
            <span className={style.navigationBottomItemText}>Feed</span>
            {isRoot && (
              <motion.span
                className={`
                  ${style.navigationBottomMotionSpan}
                  ${style.navigationBottomMotionSpanColor}
                  ${style.navigationBottomMotionSpanColorDark}
                `}
                layoutId='activeTab'
              />
            )}
          </span>
        </Link>

        <BottomButtonCreatePost />

        <Link href='/spaces' passHref>
          <span
            className={`
              ${style.navigationBottomItem}
              ${isSpaces ? style.navigationBottomItemColorActive : style.navigationBottomItemColor}
            `}
          >
            <SVGIcon icon='faSatellite' />
            <span className={style.navigationBottomItemText}>Spaces</span>
            {isSpaces && (
              <motion.span
                className={`
                  ${style.navigationBottomMotionSpan}
                  ${style.navigationBottomMotionSpanColor}
                  ${style.navigationBottomMotionSpanColorDark}
                `}
                layoutId='activeTab'
              />
            )}
          </span>
        </Link>
      </div>
    </div>
  ) : null
}

export default BottomNavigation
