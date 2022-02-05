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
import { getTrendingHashtags } from 'lib/storeUtils'
import Tag from 'components/Tags/Tag'
// import PostDialog from 'components/Dialog/PostDialog' // Hidden Post Buttton

const AsideNavigation: FunctionComponent = () => {
  // const [openPostDialog, setOpenPostDialog] = useState(false) // Hidden Post Buttton
  const router = useRouter()
  const { pathname } = router

  let tabIndex = -1
  if (pathname === '/') tabIndex = 0
  else if (pathname.startsWith('/spaces')) tabIndex = 1
  else if (pathname.startsWith('/space/')) tabIndex = 2
  else if (pathname.startsWith('/bookmarks/')) tabIndex = 3
  else if (pathname.startsWith('/likes/')) tabIndex = 4
  else if (pathname.startsWith('/user/')) tabIndex = 5

  const [isSignedUp, userName, posts] = useStore((state) => [state.isSignedUp, state.userName, state.posts])
  const [isDarkmode, setIsDarkmode] = useStore((state) => [state.isDarkmode, state.setIsDarkmode])

  const toggleDarkMode = (): void => {
    if (isDarkmode) {
      setIsDarkmode(false)
    } else {
      setIsDarkmode(true)
    }
  }

  // Get trending hashtags
  const hashtags = getTrendingHashtags(posts, 12, 1)
  const trendingTags = hashtags.map((tag: any) => (
    <Link href={`/tag/${tag.tag}`} passHref>
      <a href='passed'>
        <Tag clickable>
          {tag.tag} [{tag.count}]
        </Tag>
      </a>
    </Link>
  ))

  return (
    <div className={style.navigationAsideWrapper}>
      <div className={style.navigationAsideInner}>
        <div className={style.navigationAsideInnerTop}>
          <div className={style.navigationAsideButtonContainer}>
            <Link href='/' passHref>
              <span>
                <AsideNavigationItem isActive={tabIndex === 0} icon='faSatelliteDish' name='Feed' />
              </span>
            </Link>
            <Link href='/spaces' passHref>
              <span>
                <AsideNavigationItem isActive={tabIndex === 1} icon='faSatellite' name='Spaces' />
              </span>
            </Link>
            {isSignedUp && (
              <>
                <Link href={`/user/${userName}`} passHref>
                  <span>
                    <AsideNavigationItem isActive={tabIndex === 5} icon='faUserAstronaut' name='My Posts' />
                  </span>
                </Link>

                <Tooltip classNames='disabled-link' text='Good things take time'>
                  <Link href='/' passHref>
                    <span>
                      <AsideNavigationItem isActive={tabIndex === 3} icon='faBookmark' name='Bookmarks' />
                    </span>
                  </Link>
                </Tooltip>

                <Tooltip classNames='disabled-link' text='Good things take time'>
                  <Link href='/' passHref>
                    <span>
                      <AsideNavigationItem isActive={tabIndex === 4} icon='faHeart' name='Likes' />
                    </span>
                  </Link>
                </Tooltip>

                <span className='pt-5'>Trending</span>
                {trendingTags}

                {/* Hidden Post Buttton */}
                {/* <div className={style.navigationAsideButtonSpacer} />
                <button
                  type='submit'
                  className={`
                   ${style.button}
                   ${style.buttonDecensored}
                   ${style.buttonNoXsPadding}
                  `}
                  onClick={() => setOpenPostDialog(true)}
                >
                  <SVGIcon icon='faPlus' isFixed/>
                  <span className='whitespace-nowrap hidden sm:inline sm:pl-1'>
                    New Post
                  </span>
                </button>

                <PostDialog
                  showDialog={openPostDialog}
                  onClose={() => setOpenPostDialog(false)}
                /> */}
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
  )
}

export default AsideNavigation
