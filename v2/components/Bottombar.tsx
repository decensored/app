import Link from 'next/link';
import { faSatellite, faSatelliteDish, faUserAstronaut} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Bottombar(props: { isSignedUp: boolean; }) {
    return (
        <nav className="fixed flex gap-y-5 left-0 right-0 bottom-0 bg-white dark:bg-black shadow-2xl divide-y divide-solid divide-gray-200 dark:divide-gray-800">
            <div className="container mx-auto py-6 max-w-md flex gap-y-5">
                <Link href="/">
                    <a className="grow flex flex-col items-center cursor-pointer justify-center text-decensored-900 hover:text-purple-800 dark:text-decensored-500 dark:hover:text-decensored-100">
                        <FontAwesomeIcon icon={faSatelliteDish} className='text-3xl' />
                        <span className="text-xs mt-2">Feed</span>
                    </a>
                </Link>
                <Link href="/spaces">
                    <a className="grow flex flex-col items-center cursor-pointer justify-center text-decensored-900 hover:text-purple-800 dark:text-decensored-500 dark:hover:text-decensored-100">
                        <FontAwesomeIcon icon={faSatellite} className='text-3xl' />
                        <span className="text-xs mt-2">Spaces</span>
                    </a>
                </Link>
                { props.isSignedUp && 
                <Link href="/space/MrSupertramp">
                    <a className="grow flex flex-col items-center cursor-pointer justify-center text-decensored-900 hover:text-purple-800 dark:text-decensored-500 dark:hover:text-decensored-100">
                        <FontAwesomeIcon icon={faUserAstronaut} className='text-3xl' />
                        <span className="text-xs mt-2">My Posts</span>
                    </a>
                </Link>
                }
            </div>
        </nav>
    )
}