import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'
import SVGIcon from 'components/Icon/SVGIcon'
import Link from 'next/link'

interface SocialIconsItemProps {
  classNames: string
}

const SocialIconsItem: FunctionComponent<SocialIconsItemProps> = ({ classNames }) => (
  <div className={classNames}>
    <Link href='https://twitter.com/decensored_app' passHref>
      <a
        href='dummy-href'
        target='_blank'
        title='twitter'
        rel='noreferrer'
        className={`
          ${style.navigationAsideSocialButton}
          ${style.navigationAsideSocialButtonDark}
        `}
      >
        <SVGIcon icon='faTwitter' isFixed />
      </a>
    </Link>
    <Link href='https://t.co/pxUEdb5sHp' passHref>
      <a
        href='dummy-href'
        target='_blank'
        title='discord'
        rel='noreferrer'
        className={`
          ${style.navigationAsideSocialButton}
          ${style.navigationAsideSocialButtonDark}
        `}
      >
        <SVGIcon icon='faDiscord' isFixed />
      </a>
    </Link>
    <Link href='https://github.com/decensored/app' passHref>
      <a
        href='dummy-href'
        target='_blank'
        title='github'
        rel='noreferrer'
        className={`
          ${style.navigationAsideSocialButton}
          ${style.navigationAsideSocialButtonDark}
        `}
      >
        <SVGIcon icon='faGithub' isFixed />
      </a>
    </Link>
  </div>
)

export default SocialIconsItem
