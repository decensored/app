import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import {
  faSatellite,
  faSatelliteDish,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { faDiscord, faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const AsideNavigation: FunctionComponent = () => {
  const router = useRouter()
  const { pathname } = router

  let tabIndex = -1
  if (pathname === '/') tabIndex = 0
  else if (pathname.startsWith('/space')) tabIndex = 1
  else if (pathname.startsWith('/user/')) tabIndex = 2
  // console.log(pathname, tabIndex)

  const [isSignedUp, userName] = useStore((state) => [
    state.isSignedUp,
    state.userName,
  ])

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
                <FontAwesomeIcon icon={faSatelliteDish} className={classNamesLib.navigationAsideButtonIcon} />
                <span className={classNamesLib.navigationAsideButtonText}>Feed</span>
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
                <FontAwesomeIcon icon={faSatellite} className={classNamesLib.navigationAsideButtonIcon} />
                <span className={classNamesLib.navigationAsideButtonText}>Spaces</span>
              </span>
            </Link>
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
                  <FontAwesomeIcon icon={faUserAstronaut} className={classNamesLib.navigationAsideButtonIcon} />
                  <span className={classNamesLib.navigationAsideButtonText}>My Posts</span>
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className={classNamesLib.navigationAsideInnerBottom}>
          <div className={classNamesLib.navigationAsideSocialWrapper}>
            <Link href='https://twitter.com/decensored_app' passHref>
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
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </Link>
            <Link href='https://t.co/Lmou3Qx5Ap' passHref>
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
                <FontAwesomeIcon icon={faDiscord} />
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
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AsideNavigation