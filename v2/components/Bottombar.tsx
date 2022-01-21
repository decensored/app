import React, { FunctionComponent } from 'react'
import Link from 'next/link'
import {
  faSatellite,
  faSatelliteDish,
  faUserAstronaut,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface BottombarProps {
  isSignedUp: boolean
}

const navItemClasses = {
  flexbox: 'flex grow flex-col items-center justify-center',
  text: 'cursor-pointer text-3xl',
  textColor: 'text-decensored-900 hover:text-purple-800',
  darkTextColor: 'dark:text-decensored-500 dark:hover:text-decensored-100',
}

const Bottombar: FunctionComponent<BottombarProps> = ({ isSignedUp }) => (
  <nav
    className='fixed flex gap-y-5 left-0 right-0 bottom-0 bg-white
    dark:bg-black shadow-2xl divide-y divide-solid divide-gray-200
    dark:divide-gray-800'
  >
    <div className='container mx-auto py-6 max-w-md flex gap-y-5'>
      <Link href='/' passHref>
        <span
          className={`
            ${navItemClasses.flexbox}
            ${navItemClasses.text}
            ${navItemClasses.textColor}
            ${navItemClasses.darkTextColor}
        `}
        >
          <FontAwesomeIcon icon={faSatelliteDish} />
          <span className='text-xs mt-2'>Feed</span>
        </span>
      </Link>
      <Link href='/spaces' passHref>
        <span
          className={`
            ${navItemClasses.flexbox}
            ${navItemClasses.text}
            ${navItemClasses.textColor}
            ${navItemClasses.darkTextColor}
        `}
        >
          <FontAwesomeIcon icon={faSatellite} />
          <span className='text-xs mt-2'>Spaces</span>
        </span>
      </Link>
      {isSignedUp && (
        <Link href='/user/MrSupertramp' passHref>
          <span
            className={`
            ${navItemClasses.flexbox}
            ${navItemClasses.text}
            ${navItemClasses.textColor}
            ${navItemClasses.darkTextColor}
        `}
          >
            <FontAwesomeIcon icon={faUserAstronaut} />
            <span className='text-xs mt-2'>My Posts</span>
          </span>
        </Link>
      )}
    </div>
  </nav>
)

export default Bottombar
