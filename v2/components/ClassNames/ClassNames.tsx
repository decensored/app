/* eslint-disable max-len */
export const classNamesLib = {
  body: 'font-sans bg-slate-100 dark:bg-black text-gray-900 dark:text-gray-500',

  input: 'form-input px-3 rounded w-full focus:outline-none border border-gray-300 focus:ring-2 focus:ring-purple-700 h-[40px]',
  inputDark: 'dark:bg-black dark:border-gray-500',

  button: 'font-medium px-4 rounded whitespace-nowrap cursor-pointer h-[40px]',
  buttonDecensored: 'bg-purple-500 hover:bg-purple-700 text-white',
  buttonTransparent: 'bg-transparent text-gray-900 hover:text-purple-900',
  buttonTransparentDark: 'dark:text-gray-500',

  dialogOverlay: 'fixed inset-0 bg-black opacity-70',
  dialogWrapper: 'flex fixed top-20 w-full mx-auto items-center justify-center',
  dialogInner: 'relative bg-white max-w-sm mx-auto shadow-xl rounded bg-white divide-y divide-solid divide-gray-200',
  dialogInnerDark: 'dark:bg-gray-900 dark:divide-gray-800',
  dialogHeader: 'text-xl text-bold text-center px-8 py-4',
  dialogHeaderDark: 'dark:text-gray-300',
  dialogLabel: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2',
  dialogLabelDark: 'dark:text-gray-300',
  dialogBody: 'p-8',
  dialogFooter: 'flex gap-y-10 justify-between px-8 py-4',

  popoverWrapper: 'rounded bg-white w-60 divide-y divide-solid divide-gray-200 text-gray-900 dark:text-gray-500',
  popoverHeader: 'px-4 py-3',
  popoverHeaderLabel: 'text-xs',
  popoverHeaderName: 'text-lg',
  popoverBody: 'p-4 flex flex-col gap-y-2',
  popoverBodyButton: 'rounded bg-gray-100 hover:bg-gray-500 text-left px-3 py-1 text-gray-900 hover:text-white',

  navigationBottomWrapper: 'fixed left-0 right-0 bottom-0 flex gap-y-5 bg-white shadow-2xl',
  navigationBottomWrapperDark: 'dark:bg-black dark:divide-gray-800',
  navigationBottomInner: 'container mx-auto py-6 max-w-md flex gap-y-5',
  navigationBottomItem: 'flex grow flex-col items-center justify-center cursor-pointer text-3xl',
  navigationBottomItemColor: 'text-decensored-900 hover:text-purple-800 dark:text-decensored-500 dark:hover:text-decensored-100',
  navigationBottomItemColorActive: 'text-purple-800 dark:text-decensored-100',
  navigationBottomItemText: 'relative text-xs mt-2 flex flex-col',
  navigationBottomMotionSpan: 'h-[1px] absolute -left-1 -right-1 -bottom-2',
  navigationBottomMotionSpanColor: 'bg-purple-800',
  navigationBottomMotionSpanColorDark: 'dark:bg-decensored-100',
}
