import { faShieldAlt, faComment, faShare} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FeedItem() {
    return (
        <div className="post bg-white dark:bg-gray-900 rounded divide-y divide-solid divide-gray-200 dark:divide-gray-800 shadow-sm">
            <div className="rounded-t p-5">
                <div className="meta flex justify-between">
                    <a href="?u=dasdasdas2" className="author font-bold text-gray-900 dark:text-gray-300">Username</a>
                    <div className="time text-sm text-right">Jan/19 2022, 19:16</div>
                </div>
                <div className="message break-words mt-2">This is a super cool text.</div>
            </div>
            <div className="px-5 py-3 rounded-b flex justify-between">
                <div className="flex gap-x-3 items-center">
                    <FontAwesomeIcon icon={faShieldAlt} className='cursor-pointer text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 fa-shield-alt'/>
                </div>
                <div className="flex gap-x-3 items-center">
                    <FontAwesomeIcon icon={faComment} className='cursor-pointer text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 fa-shield-alt'/>
                    <FontAwesomeIcon icon={faShare} className='cursor-pointer text-gray-300 hover:text-gray-900 dark:text-gray-500 dark:hover:text-gray-300 fa-shield-alt'/>
                </div>
            </div>
        </div>
    )
}