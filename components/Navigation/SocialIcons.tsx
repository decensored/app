import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'
import SVGIcon from 'components/Icon/SVGIcon'
import Link from 'next/link'
import { url } from 'lib/urls'

interface SocialIconsItemProps {
  classNames: string
}

const SocialIconsItem: FunctionComponent<SocialIconsItemProps> = ({ classNames }) => (
  <div className={classNames}>
    <Link href={url.twitter} passHref>
      <a
        href='passed'
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
    <Link href={url.discord} passHref>
      <a
        href='passed'
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
    <Link href={url.github} passHref>
      <a
        href='passed'
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
