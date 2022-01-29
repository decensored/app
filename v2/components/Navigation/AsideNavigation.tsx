import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { faMoon, faPlus, faSun } from '@fortawesome/free-solid-svg-icons'
import {
  faDiscord,
  faGithub,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import Tooltip from 'components/Tooltip/Tooltip'
import AsideNavigationItem from 'components/Navigation/AsideNavigationItem'

const AsideNavigation: FunctionComponent = () => {
  const router = useRouter()
  const { pathname } = router

  let tabIndex = -1
  if (pathname === '/') tabIndex = 0
  else if (pathname.startsWith('/spaces')) tabIndex = 1
  else if (pathname.startsWith('/space/')) tabIndex = 2
  else if (pathname.startsWith('/bookmarks/')) tabIndex = 3
  else if (pathname.startsWith('/likes/')) tabIndex = 4
  else if (pathname.startsWith('/user/')) tabIndex = 5

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
              <span>
                <AsideNavigationItem
                  isActive={tabIndex === 0}
                  icon='faSatelliteDish'
                  name='Feed'
                />
              </span>
            </Link>
            <Link href='/spaces' passHref>
              <span>
                <AsideNavigationItem
                  isActive={tabIndex === 1}
                  icon='faSatellite'
                  name='Spaces'
                />
              </span>
            </Link>
            {isSignedUp && (
              <>
                <Tooltip
                  classNames='disabled-link'
                  text='Good things take time'
                >
                  <Link href='/' passHref>
                    <span>
                      <AsideNavigationItem
                        isActive={tabIndex === 3}
                        icon='faBookmark'
                        name='Bookmarks'
                      />
                    </span>
                  </Link>
                </Tooltip>

                <Tooltip
                  classNames='disabled-link'
                  text='Good things take time'
                >
                  <Link href='/' passHref>
                    <span>
                      <AsideNavigationItem
                        isActive={tabIndex === 4}
                        icon='faHeart'
                        name='Likes'
                      />
                    </span>
                  </Link>
                </Tooltip>

                <Link href={`/user/${userName}`} passHref>
                  <span>
                    <AsideNavigationItem
                      isActive={tabIndex === 5}
                      icon='faUserAstronaut'
                      name='My Posts'
                    />
                  </span>
                </Link>

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
