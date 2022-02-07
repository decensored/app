import React, { FunctionComponent } from 'react'
// import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SVGIcon from 'components/Icon/SVGIcon'
import useStore from 'lib/store'
import { style } from 'styles/style'
import Tooltip from 'components/Tooltip/Tooltip'
import AsideNavigationItem from 'components/Navigation/AsideNavigationItem'
import SocialIcons from 'components/Navigation/SocialIcons'
import { useMediaQuery } from 'react-responsive'
import TrendingHashtags from '../Tags/TrendingHashtags'
import AsideButtonCreatePost from './AsideButtonCreatePost'

const AsideNavigation: FunctionComponent = () => {
  const [isSignedUp, userName, posts] = useStore((state) => [state.isSignedUp, state.userName, state.posts])
  const [isDarkmode, setIsDarkmode] = useStore((state) => [state.isDarkmode, state.setIsDarkmode])

  const router = useRouter()
  const { pathname } = router

  const isRoot = pathname === '/'
  const isSpaces = pathname.startsWith('/spaces')
  const isBookmarks = pathname.startsWith('/bookmarks/')
  const isLikes = pathname.startsWith('/likes/')
  const isUser = pathname.startsWith('/user/')

  const isLargerThanMD = useMediaQuery({ query: '(min-width: 768px)' })

  const toggleDarkMode = (): void => setIsDarkmode(!isDarkmode)

  return isLargerThanMD ? (
    <div className={style.navigationAsideWrapper}>
      <div className={style.navigationAsideInner}>
        <div className={style.navigationAsideInnerTop}>
          <div className={style.navigationAsideButtonContainer}>
            <Link href='/' passHref>
              <span>
                <AsideNavigationItem isActive={isRoot} icon='faSatelliteDish' name='Feed' />
              </span>
            </Link>
            <Link href='/spaces' passHref>
              <span>
                <AsideNavigationItem isActive={isSpaces} icon='faSatellite' name='Spaces' />
              </span>
            </Link>
            {isSignedUp && (
              <>
                <Link href={`/user/${userName}`} passHref>
                  <span>
                    <AsideNavigationItem isActive={isUser} icon='faUserAstronaut' name='My Posts' />
                  </span>
                </Link>
                <Tooltip classNames='disabled-link' text='Good things take time'>
                  <Link href='/' passHref>
                    <span>
                      <AsideNavigationItem isActive={isBookmarks} icon='faBookmark' name='Bookmarks' />
                    </span>
                  </Link>
                </Tooltip>
                <Tooltip classNames='disabled-link' text='Good things take time'>
                  <Link href='/' passHref>
                    <span>
                      <AsideNavigationItem isActive={isLikes} icon='faHeart' name='Likes' />
                    </span>
                  </Link>
                </Tooltip>
                <TrendingHashtags posts={posts} classNames={style.tagListCol} />
                <AsideButtonCreatePost />
              </>
            )}
          </div>
        </div>
        <div className={style.navigationAsideInnerBottom}>
          <div className={style.navigationAsideBottomInteractionWrapper}>
            <div>
              <button
                type='button'
                onClick={toggleDarkMode}
                className={`
                  toggleDarkMode
                  ${style.switch}
                  ${style.switchDark}
                  ${style.navigationAsideInteractionSwitch}
                `}
              >
                {isDarkmode && (
                  <div className={`${style.switchInner} ${style.switchInnerDark}`}>
                    <SVGIcon icon='faMoon' isFixed />
                  </div>
                )}
                {!isDarkmode && (
                  <div className={`${style.switchInner} ${style.switchInnerDark}`}>
                    <SVGIcon icon='faSun' isFixed />
                  </div>
                )}
              </button>
            </div>
            <SocialIcons classNames={style.navigationAsideSocialButtonWrapper} />
          </div>
        </div>
      </div>
    </div>
  ) : null
}

export default AsideNavigation
