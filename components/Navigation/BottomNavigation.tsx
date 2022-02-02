import React, { FunctionComponent, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { style } from 'styles/style'
import PostDialog from 'components/Dialog/PostDialog'

const BottomNavigation: FunctionComponent = () => {
  const [openPostDialog, setOpenPostDialog] = useState(false)
  const router = useRouter()
  const { pathname } = router

  // Hidden Post Buttton
  const postButtonIsHidden = true

  let tabIndex = -1
  if (pathname === '/') tabIndex = 0
  else if (pathname.startsWith('/spaces')) tabIndex = 1

  const [isSignedUp] = useStore((state) => [state.isSignedUp, state.userName])

  return (
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
              ${tabIndex === 0 ? style.navigationBottomItemColorActive : style.navigationBottomItemColor}
            `}
          >
            <SVGIcon icon='faSatelliteDish' />
            <span className={style.navigationBottomItemText}>Feed</span>
            {tabIndex === 0 && (
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

        {isSignedUp && !postButtonIsHidden && (
          <>
            <div className={style.navigationBottomPostButtonWrapper}>
              <div
                className={`
                ${style.navigationBottomPostButtonPseudo}
                ${style.navigationBottomPostButtonBefore}
                ${style.navigationBottomPostButtonBeforeDark}
              `}
              >
                <div
                  className={`
                  ${style.navigationBottomPostButtonPseudoInner}
                  ${style.navigationBottomPostButtonBeforeInner}
                  ${style.navigationBottomPostButtonBeforeInnerDark}
                `}
                />
              </div>
              <button
                type='button'
                className={`${style.navigationBottomPostButton} ${style.buttonDecensored}`}
                onClick={() => setOpenPostDialog(true)}
              >
                <SVGIcon icon='faPlus' />
              </button>
              <div
                className={`
                ${style.navigationBottomPostButtonPseudo}
                ${style.navigationBottomPostButtonAfter}
                ${style.navigationBottomPostButtonAfterDark}
              `}
              >
                <div
                  className={`
                  ${style.navigationBottomPostButtonPseudoInner}
                  ${style.navigationBottomPostButtonAfterInner}
                  ${style.navigationBottomPostButtonAfterInnerDark}
                `}
                />
              </div>
            </div>
            <PostDialog showDialog={openPostDialog} onClose={() => setOpenPostDialog(false)} />
          </>
        )}

        <Link href='/spaces' passHref>
          <span
            className={`
              ${style.navigationBottomItem}
              ${tabIndex === 1 ? style.navigationBottomItemColorActive : style.navigationBottomItemColor}
            `}
          >
            <SVGIcon icon='faSatellite' />
            <span className={style.navigationBottomItemText}>Spaces</span>
            {tabIndex === 1 && (
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
  )
}

export default BottomNavigation
