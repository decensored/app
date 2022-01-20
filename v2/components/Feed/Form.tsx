import Image from 'next/image';
import logo from '../../public/logo/logotype.svg';

export default function Form() {
  return (
    <div
      id="input"
      className="container mx-auto max-w-md bg-white dark:bg-gray-900 rounded shadow-sm divide-y divide-solid divide-gray-200 dark:divide-gray-800 sticky -top-28"
    >
      <div className="p-4 relative">
        <textarea
          placeholder="Your story starts here"
          className="form-input bg-transparent rounded w-full border-none outline-none p-0 h-20 resize-none"
        ></textarea>
        <div
          id="message-count"
          className="absolute right-4 bottom-4 py-1 px-2 text-xs text-gray-400 rounded-full bg-white dark:bg-black empty:hidden font-mono leading-none"
        ></div>
      </div>
      <div id="spread-bar" className="p-5 pl-2 flex justify-between">
        <div>
          <Image src={logo} alt="Signet" className="mx-auto w-40" />
        </div>
        <div>
          <button
            id="submit"
            className="bg-decensored-900 hover:bg-purple-800 text-white font-medium py-2 px-3 rounded cursor-pointer"
          >
            Spread it
          </button>
          <button
            id="to-top"
            className="bg-decensored-900 hover:bg-purple-800 text-white font-medium py-2 px-3 rounded cursor-pointer hidden"
          >
            Back to top
          </button>
        </div>
      </div>
    </div>
  );
}
