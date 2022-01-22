/* eslint-disable max-len */
export const classNamesLib = {
  input: 'form-input px-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-purple-700 h-[40px]',
  inputDark: 'dark:bg-black border border-gray-300 dark:border-gray-500',

  button: 'font-medium px-4 rounded whitespace-nowrap cursor-pointer h-[40px]',
  buttonDecensored: 'bg-purple-500 hover:bg-purple-700 text-white',
  buttonTransparent: 'bg-transparent text-gray-900 hover:text-purple-900 dark:text-gray-500',

  dialogOverlay: 'fixed inset-0 bg-black opacity-70',
  dialogWrapper: 'flex fixed top-20 w-full mx-auto items-center justify-center',
  dialogInner: 'relative bg-white max-w-sm mx-auto shadow-xl rounded bg-white divide-y divide-solid divide-gray-200',
  dialogInnerDark: 'dark:bg-gray-900 dark:divide-gray-800',
  dialogHeader: 'text-xl text-bold text-center px-8 py-4',
  dialogLabel: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
  dialogBody: 'p-8',
  dialogFooter: 'flex gap-y-10 justify-between px-8 py-4',

  navigationBottomWrapper: 'fixed left-0 right-0 bottom-0 flex gap-y-5 bg-white shadow-2xl',
  navigationBottomWrapperDark: 'dark:bg-black dark:divide-gray-800',
  navigationBottomInner: 'container mx-auto py-6 max-w-md flex gap-y-5',
  navigationBottomItem: 'flex grow flex-col items-center justify-center cursor-pointer text-3xl text-decensored-900 hover:text-purple-800',
  navigationBottomItemDark: 'dark:text-decensored-500 dark:hover:text-decensored-100',
  navigationBottomItemText: 'text-xs mt-2'
}
