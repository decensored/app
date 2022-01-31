/* eslint-disable max-len */
/* prettier-ignore */
export const style = {
  body: 'font-sans bg-slate-100 text-gray-900',
  bodyDark: 'dark:bg-darkmode-100 dark:text-gray-400',

  bodyContainer: 'container mx-auto max-w-screen-lg flex md:gap-x-[2%]',
  bodyContainerCol1: 'flex-none w-[34px] md:w-48 pl-3',
  bodyContainerCol2: 'flex-auto',

  headerWrapper: 'h-header sticky top-0 left-0 right-0 bg-gradient w-full flex flex-col items-start z-10',
  headerInner: 'flex w-full gap-y-5 p-4 justify-between items-center',

  inputWrapper: 'relative',
  inputGroup: 'flex',
  input: 'px-3 py-[7.3px] rounded w-full border border-gray-300 text-gray-900 focus:outline-none',
  inputFocus: 'focus:ring-1 focus:ring-purple-700',
  inputDark: 'dark:bg-darkmode-100 dark:border-hidden dark:text-white',
  inputTransparent: 'text-gray-900 !p-0 bg-transparent border-none outline-none focus:outline-none',
  inputTransparentDark: 'dark:text-white',
  inputPlaceholder: 'placeholder:italic placeholder:text-gray-400',
  inputPlaceholderDark: 'placeholder:dark text-darkmode-1500',

  inputLabel: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3',
  inputLabelDark: 'dark:text-gray-300',
  inputLabelCenter: 'text-center',

  form: 'resize-none',
  formValidation: 'px-[9px] py-1 flex items-center absolute left-[3px] right-[3px] rounded-b bg-white before:rounded-b before:absolute before:inset-0 before:empty before:bg-opacity-20',
  formValidationBefore: '',
  formValidationError: 'before:bg-red-500',
  formValidationText: 'text-xs',
  formValidationTextError: 'text-red-500',

  button: 'font-medium px-4 rounded whitespace-nowrap cursor-pointer h-[40px] focus:outline-none',
  buttonNoXsPadding: 'px-0 md:px-4',
  buttonDecensored: 'bg-highlight-900 hover:bg-purple-800 text-white',
  buttonDecensoredHeader: 'bg-purple-500 hover:bg-purple-700 text-white',
  buttonTransparent: 'bg-transparent text-gray-900 hover:text-purple-900',
  buttonTransparentDark: 'dark:text-gray-500',

  dialogOverlay: 'fixed inset-0 bg-black opacity-70',
  dialogWrapper: 'flex fixed top-20 w-full mx-auto items-center justify-center',
  dialogInner: 'relative bg-white w-full mx-auto shadow-xl mx-3 rounded bg-white divide-y divide-solid divide-gray-200',
  dialogInnerDark: 'dark:bg-darkmode-600 dark:divide-darkmode-1000',
  dialogHeader: 'text-xl text-bold text-center px-8 py-4',
  dialogHeaderDark: 'dark:text-gray-300',
  dialogBody: 'p-8',
  dialogFooter: 'flex gap-y-10 justify-between px-8 py-4',

  popoverWrapper: 'rounded bg-white w-52 divide-y divide-solid divide-gray-200 shadow-xl',
  popoverWrapperDark: 'dark:bg-darkmode-600 dark:divide-darkmode-1000',
  popoverHeader: 'px-4 py-3',
  popoverHeaderLabel: 'text-xs',
  popoverHeaderName: 'text-lg dark:text-gray-300',
  popoverBody: 'p-2 flex flex-col gap-y-1',
  popoverBodyButton: 'rounded flex items-center gap-x-3 text-left p-2 text-sm text-gray-900 hover:text-highlight-900 hover:bg-highlight-10',
  popoverBodyButtonDark: 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-highlight-900',

  navigationAsideWrapper: 'flex pt-10 sticky top-[60px]',
  navigationAsideInner: 'flex flex-col justify-between grow h-screen-sidebar',
  navigationAsideInnerTop: '',
  navigationAsideInnerBottom: 'pb-4',
  navigationAsideButtonWrapper: 'flex flex-col gap-y-1',
  navigationAsideButton: 'rounded flex items-center gap-x-3 text-left p-2 text-sm text-gray-900 hover:text-white hover:bg-highlight-500 cursor-pointer',
  navigationAsideButtonDark: 'dark:text-gray-300 dark:hover:text-white dark:hover:bg-highlight-500',
  navigationAsideButtonActive: 'font-bold text-highlight-900 dark:text-highlight-500',
  navigationAsideButtonText: 'hidden md:block',
  navigationAsideButtonIcon: 'w-[40px] text-lg md:text-sm',
  navigationAsideButtonIconInvisible: 'text-lg md:text-sm opacity-0',
  navigationAsideButtonSpacer: 'h-5',
  navigationAsideBottomInteractionWrapper: 'flex flex-col flex-col-reverse items-center gap-3 md:justify-between md:flex-row',
  navigationAsideInteractionSwitch: 'mt-2 md:mt-0',
  navigationAsideSocialButtonWrapper: 'flex flex-col md:flex-row gap-2',
  navigationAsideSocialButton: 'text-lg md:text-xl text-gray-900 hover:text-highlight-900',
  navigationAsideSocialButtonDark: 'dark:text-gray-300 dark:hover:text-white',

  navigationBottomWrapperBorder: 'absolute left-0 right-0 bottom-0 h-[10px] bg-highlight-900',
  navigationBottomWrapper: 'fixed items-center left-0 right-0 bottom-0 flex bg-white h-[60px] shadow-neg-lg',
  navigationBottomWrapperDark: 'dark:bg-darkmode-500 dark:divide-darkmode-1000',
  navigationBottomInner: 'px-3 flex mx-auto max-w-xl w-full',
  navigationBottomItem: 'relative flex grow flex-col items-center justify-center cursor-pointer text-[15px] z-10',
  navigationBottomItemText: 'text-[10px] leading-[10px] pt-[6px] pb-[4px]',
  navigationBottomItemColor: 'text-highlight-900 hover:text-purple-800 dark:text-highlight-500 dark:hover:text-highlight-100',
  navigationBottomItemColorActive: 'text-purple-800 dark:text-highlight-100',

  navigationBottomPostButtonWrapper: 'w-[65px] relative group',
  navigationBottomPostButton: 'rounded-t-full w-[65px] h-[65px] text-2xl absolute top-1/2 -translate-y-2/4',
  navigationBottomPostButtonPseudo: 'absolute bg-highlight-900 group-hover:bg-purple-800 w-[50vw] top-0 -bottom-[15px] pointer-events-none',
  navigationBottomPostButtonPseudoInner: 'absolute w-full h-full -top-[12px]',
  navigationBottomPostButtonBefore: 'left-0 -translate-x-full',
  navigationBottomPostButtonBeforeDark: '',
  navigationBottomPostButtonBeforeInner: 'bg-white rounded-br-xl left-0',
  navigationBottomPostButtonBeforeInnerDark: 'dark:bg-darkmode-500',
  navigationBottomPostButtonAfter: 'right-0 translate-x-full',
  navigationBottomPostButtonAfterDark: '',
  navigationBottomPostButtonAfterInner: 'bg-white rounded-bl-xl',
  navigationBottomPostButtonAfterInnerDark: 'dark:bg-darkmode-500',

  navigationBottomMotionSpan: 'h-[1px] absolute w-[50px] -bottom-[8px]',
  navigationBottomMotionSpanColor: 'bg-white',
  navigationBottomMotionSpanColorDark: 'dark:bg-highlight-100',

  virtuosoWrapper: '',
  virtuosoScroll2IndexWrapper: 'h-10',
  virtuosoScroll2IndexInner: 'h-10 bg-black',
  virtuosoFeedItemWrapper: 'px-3 mb-5',

  postFormTextareaWrapper: 'mt-5 relative',
  postFormMessageCounter: 'absolute right-4 bottom-4 py-1 px-2 text-xs text-gray-400 rounded-full bg-white empty:hidden font-mono leading-none',
  postFormMessageCounterDark: 'dark:bg-black',
  postFormFooter: 'mt-5 flex justify-between',
  postFormFooterLogoWrapper: 'flex items-center mr-5',

  feedWrapper: 'flex flex-col gap-y-5 px-3 mt-3 md:mt-10',

  feedItemParent: 'border-none rounded',
  feedItemChild: 'border-l border-gray-300',

  feedItemWrapper: 'bg-white',
  feedItemWrapperDark: 'dark:bg-darkmode-600 dark:divide-darkmode-200 dark:border-darkmode-1900',
  feedItemInner: 'rounded p-5',
  feedItemInnerTop: 'rounded-t p-5 pt-3',
  feedItemInnerBottom: 'px-5 py-3 rounded-b flex justify-between',
  feedItemInnerBottomCol: 'flex gap-x-3 items-center',
  feedItemMetaWrapper: 'flex justify-between mb-2 items-baseline',
  feedItemMetaTimestamp: 'text-xs text-right text-gray-500',
  feedItemMetaName: 'font-bold text-gray-900',
  feedItemMetaNameDark: 'dark:text-gray-300',
  feedItemText: 'break-words overflow-hidden font-light',
  feedItemTextDark: '',
  feedItemInteractionIcon: 'cursor-pointer text-highlight-40 hover:text-highlight-500',
  feedItemInteractionIconDark: 'dark:text-darkmode-1700 dark:hover:text-highlight-400',

  feedReplyItemWrapper: 'rounded-none',
  feedReplyItemOffset: 'pl-7 children:rounded-none children:children:rounded-none',
  feedReplyItemBar: 'flex items-center pt-3 empty:hidden',
  feedReplyItemButton: 'cursor-pointer text-xs text-highlight-500',
  feedReplyItemText: 'cursor-pointer text-xs',
  feedReplyItemSpacer: 'mx-2 text-[10px]',

  blackListTagWrapper: 'flex gap-x-1 items-center uppercase bg-highlight-100 text-gray-600 text-xs tracking-wide px-2 py-1 rounded-md',
  blackListItem: 'flex-none uppercase bg-decensored-100 text-gray-600 text-xs tracking-wide font-semibold px-2 py-1 rounded-md pointer-events-none',
  blackListButton: 'hidden cursor-pointer group-hover:block text-xs bg-red-400 text-white px-2 ml-2 rounded-md',

  spaceHeaderWrapper: 'bg-gradient rounded px-5 py-7',
  spaceHeaderInner: 'flex flex-col justify-center',
  spaceHeaderTitle: 'text-center text-white text-2xl',
  spaceHeaderColsWrapper: 'flex w-full mx-auto justify-evenly text-white pt-2 text-center',
  spaceHeaderColWrapper: 'flex flex-col',
  spaceHeaderColTitle: 'text-2xl mt-2 font-bold',
  spaceHeaderColText: 'text-xs font-light',

  tag: 'uppercase text-xs tracking-wide font-medium px-2 py-1 rounded',
  tagNotClickable: 'cursor-default bg-highlight-10 text-highlight-900',
  tagNotClickableDark: 'dark:bg-darkmode-1000 dark:text-highlight-400',
  tagClickable: 'cursor-pointer bg-highlight-10 text-highlight-500 hover:text-highlight-900',
  tagClickableDark: 'dark:bg-darkmode-1000 dark:text-darkmode-1900 dark:hover:text-highlight-400',

  tooltip: 'uppercase text-xs tracking-wide font-medium px-2 py-1 rounded bg-highlight-100 text-highlight-900',
  tooltipDark: 'dark:bg-darkmode-1000 dark:text-highlight-400',

  switch: 'rounded-full bg-slate-300 p-[3px] w-[40px] h-[25px] flex',
  switchDark: 'rounded-full dark:bg-darkmode-600',
  switchInner: 'rounded-full text-gray-900 w-[19px] h-[19px] flex justify-center items-center',
  switchInnerDark: 'dark:text-white',

  loadingWrapper: 'fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-slate-100 flex flex-col items-center justify-center'
}
