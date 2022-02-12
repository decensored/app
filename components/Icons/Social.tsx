import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'
import Icon from 'components/Icons/Icon'
import Link from 'next/link'
import { url } from 'lib/urls'

interface SocialIconProps {
  classNames: string
}

const SocialIcon: FunctionComponent<SocialIconProps> = ({ classNames }) => (
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
        <Icon icon='faTwitter' isFixed />
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
        <Icon icon='faDiscord' isFixed />
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
        <Icon icon='faGithub' isFixed />
      </a>
    </Link>
  </div>
)

export default SocialIcon
