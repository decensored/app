import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  faBookmark,
  faHeart,
  faMoon,
  faPlus,
  faSatellite,
  faSatelliteDish,
  faSun,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import {
  faDiscord,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const AsideNavigation: FunctionComponent = () => {
  const router = useRouter()
  const { pathname } = router

  let tabIndex = -1
  if (pathname === '/') tabIndex = 0
  else if (pathname.startsWith('/spaces')) tabIndex = 1
  else if (pathname.startsWith('/user/')) tabIndex = 2
  // console.log(pathname, tabIndex)

  const [isSignedUp, userName] = useStore((state) => [
    state.isSignedUp,
    state.userName,
  ])

  const [isDarkmode, setIsDarkmode] = useStore((state) => [
    state.isDarkmode,
    state.setIsDarkmode,
  ])

  const toggleDarkMode = (): void => {
    if (isDarkmode) {
      setIsDarkmode(false)
    } else {
      setIsDarkmode(true)
    }
  }

  return (
    <div className={classNamesLib.navigationAsideWrapper}>
      <div className={classNamesLib.navigationAsideInner}>
        <div className={classNamesLib.navigationAsideInnerTop}>
          <div className={classNamesLib.navigationAsideButtonWrapper}>
            <Link href='/' passHref>
              <span
                className={`
                  ${classNamesLib.navigationAsideButton}
                  ${classNamesLib.navigationAsideButtonDark}
                  ${
                    tabIndex === 0
                      ? classNamesLib.navigationAsideButtonActive
                      : ''
                  }
                `}
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon={faSatelliteDish}
                  className={classNamesLib.navigationAsideButtonIcon}
                />
                <span className={classNamesLib.navigationAsideButtonText}>
                  Feed
                </span>
              </span>
            </Link>
            <Link href='/spaces' passHref>
              <span
                className={`
                ${classNamesLib.navigationAsideButton}
                ${classNamesLib.navigationAsideButtonDark}
                ${
                  tabIndex === 1
                    ? classNamesLib.navigationAsideButtonActive
                    : ''
                }
              `}
              >
                <FontAwesomeIcon
                  fixedWidth
                  icon={faSatellite}
                  className={classNamesLib.navigationAsideButtonIcon}
                />
                <span className={classNamesLib.navigationAsideButtonText}>
                  Spaces
                </span>
              </span>
            </Link>
            {isSignedUp && (
              <Link href='/' passHref>
                <span
                  className={`
                  ${classNamesLib.navigationAsideButton}
                  ${classNamesLib.navigationAsideButtonDark}
                  ${
                    tabIndex === 2
                      ? classNamesLib.navigationAsideButtonActive
                      : ''
                  }
                `}
                >
                  <FontAwesomeIcon
                    fixedWidth
                    icon={faBookmark}
                    className={classNamesLib.navigationAsideButtonIcon}
                  />
                  <span className={classNamesLib.navigationAsideButtonText}>
                    Bookmarks
                  </span>
                </span>
              </Link>
            )}
            {isSignedUp && (
              <Link href='/' passHref>
                <span
                  className={`
                  ${classNamesLib.navigationAsideButton}
                  ${classNamesLib.navigationAsideButtonDark}
                  ${
                    tabIndex === 2
                      ? classNamesLib.navigationAsideButtonActive
                      : ''
                  }
                `}
                >
                  <FontAwesomeIcon
                    fixedWidth
                    icon={faHeart}
                    className={classNamesLib.navigationAsideButtonIcon}
                  />
                  <span className={classNamesLib.navigationAsideButtonText}>
                    Likes
                  </span>
                </span>
              </Link>
            )}
            {isSignedUp && (
              <Link href={`/user/${userName}`} passHref>
                <span
                  className={`
                  ${classNamesLib.navigationAsideButton}
                  ${classNamesLib.navigationAsideButtonDark}
                  ${
                    tabIndex === 2
                      ? classNamesLib.navigationAsideButtonActive
                      : ''
                  }
                `}
                >
                  <FontAwesomeIcon
                    fixedWidth
                    icon={faUserAstronaut}
                    className={classNamesLib.navigationAsideButtonIcon}
                  />
                  <span className={classNamesLib.navigationAsideButtonText}>
                    My Posts
                  </span>
                </span>
              </Link>
            )}
            {isSignedUp && (
              <>
                <div className={classNamesLib.navigationAsideButtonSpacer} />
                <button
                  type='submit'
                  className={`
                   ${classNamesLib.button}
                   ${classNamesLib.buttonDecensored}
                   ${classNamesLib.buttonNoXsPadding}
                  `}
                >
                  <FontAwesomeIcon fixedWidth icon={faPlus} />
                  <span className='whitespace-nowrap hidden sm:inline sm:pl-1'>
                    New Post
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
        <div className={classNamesLib.navigationAsideInnerBottom}>
          <div
            className={classNamesLib.navigationAsideBottomInteractionWrapper}
          >
            <div>
              <button
                type='button'
                onClick={toggleDarkMode}
                className={`
                  toggleDarkMode
                  ${classNamesLib.switch}
                  ${classNamesLib.switchDark}
                  ${classNamesLib.navigationAsideInteractionSwitch}
                `}
              >
                {isDarkmode && (
                  <div
                    className={`${classNamesLib.switchInner} ${classNamesLib.switchInnerDark}`}
                  >
                    <FontAwesomeIcon fixedWidth icon={faMoon} />
                  </div>
                )}
                {!isDarkmode && (
                  <div
                    className={`${classNamesLib.switchInner} ${classNamesLib.switchInnerDark}`}
                  >
                    <FontAwesomeIcon fixedWidth icon={faSun} />
                  </div>
                )}
              </button>
            </div>
            <div className={classNamesLib.navigationAsideSocialButtonWrapper}>
              <Link href='https://twitter.com/decensored_app' passHref>
                <a
                  href='dummy-href'
                  target='_blank'
                  title='twitter'
                  rel='noreferrer'
                  className={`
                    ${classNamesLib.navigationAsideSocialButton}
                    ${classNamesLib.navigationAsideSocialButtonDark}
                  `}
                >
                  <FontAwesomeIcon fixedWidth icon={faTwitter} />
                </a>
              </Link>
              <Link href='https://discord.gg/gKvXUu4X' passHref>
                <a
                  href='dummy-href'
                  target='_blank'
                  title='discord'
                  rel='noreferrer'
                  className={`
                    ${classNamesLib.navigationAsideSocialButton}
                    ${classNamesLib.navigationAsideSocialButtonDark}
                  `}
                >
                  <FontAwesomeIcon fixedWidth icon={faDiscord} />
                </a>
              </Link>
              <Link href='https://github.com/decensored/app' passHref>
                <a
                  href='dummy-href'
                  target='_blank'
                  title='github'
                  rel='noreferrer'
                  className={`
                    ${classNamesLib.navigationAsideSocialButton}
                    ${classNamesLib.navigationAsideSocialButtonDark}
                  `}
                >
                  <FontAwesomeIcon fixedWidth icon={faGithub} />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsideNavigation
