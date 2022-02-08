/* eslint-disable max-len */
/* prettier-ignore */
export const style = {
  body: 'bg-slate-100 font-sans text-gray-900',
  bodyDark: 'dark:text-gray-400 dark:bg-darkmode-100',

  clickOverlay: 'fixed inset-0 top-[60px] bg-black bg-opacity-30',

  bodyContainer: 'container flex max-w-screen-lg md:gap-x-[5%] mx-auto',
  bodyContainerCol1: 'flex-none md:w-48 pl-3 w-[34px] empty:hidden',
  bodyContainerCol2: 'relative flex-auto max-w-full',

  headerWrapper: 'bg-gradient flex h-header items-center justify-between left-0 px-3 right-0 sticky top-0 w-full z-40',
  headerLogo: 'flex gap-x-2 items-center',
  headerBack: 'flex justify-center items-center h-[30px] text-white w-[30px]',
  loadingIndicator: '-translate-x-2/4 bg-highlight-500 fixed left-1/2 pointer-events-none px-3 py-1 rounded-full shadow-lg text-sm text-white top-[15px]',
  loadingWrapper: 'bg-slate-100 bottom-0 fixed flex flex-col h-screen items-center justify-center left-0 overflow-hidden right-0 top-0 w-full z-50',

  dequeuePostsAndSpacesWrapper: 'fixed -translate-x-1/2 md:translate-x-[34px] flex justify-center left-1/2 top-[65px] transition-transform translate-y-0 z-50',
  dequeuePostsAndSpacesButton: 'bg-highlight-500 cusor-pointer px-3 py-1 rounded-full shadow-lg text-sm text-white',

  inputWrapper: 'relative mb-5 last:mb-0',
  inputGroup: 'flex',
  inputIconAddon: 'absolute input-icon-addon left-[10px] pointer-events-none top-[7px]',
  input: 'focus:outline-none outline-none px-3 py-[7.3px] w-full',
  inputDefault: 'border border-gray-300 rounded bg-white text-gray-900',
  inputDefaultDark: 'dark:text-white dark:border-hidden dark:bg-darkmode-100',
  inputDefaultDarkBordered: 'dark:text-white dark:border-darkmode-1400 dark:bg-darkmode-100',
  inputTransparent: '!p-0 bg-transparent text-gray-900',
  inputTransparentDark: 'dark:text-white',
  inputPlaceholder: 'placeholder:text-gray-400 placeholder:italic',
  inputPlaceholderDark: 'text-darkmode-1500 placeholder:dark',
  inputFocus: 'focus:ring-purple-700 focus:ring-1',

  inputLabel: 'block font-bold mb-3 text-gray-700 text-xs tracking-wide uppercase',
  inputLabelDark: 'dark:text-gray-300',
  inputLabelCenter: 'text-center',
  inputLabelMarginTop: 'mt-5',
  inputLabelErrorMarginTop: 'mt-10',

  selectWrapper: 'relative',
  selectArrow: 'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
  selectArrowDark: 'dark:text-white',
  select: 'block appearance-none pr-8 rounded',

  form: 'resize-none min-h-[75px]',
  formValidation: 'absolute before:absolute before:bg-opacity-20 before:empty before:inset-0 before:rounded-b bg-white flex items-center left-[3px] px-[9px] py-1 right-[3px] rounded-b',
  formValidationBefore: '',
  formValidationError: 'before:bg-red-500',
  formValidationText: 'text-xs',
  formValidationTextError: 'text-red-500',

  button: 'flex items-center justify-center gap-x-2 cursor-pointer focus:outline-none font-medium h-[40px] px-4 rounded whitespace-nowrap',
  buttonFull: 'basis-full w-full',
  buttonInlineLink: 'contents',
  buttonIconOnly: 'w-[40px]',
  buttonIconOnlyMobile: 'w-[40px] sm:w-auto',
  buttonIconOnlyHandheld: 'w-[40px] md:w-auto',
  buttonNoXsPadding: 'md:px-4 px-0',
  buttonDecensored: 'text-white hover:bg-purple-800 bg-highlight-900',
  buttonDecensoredInvert: 'text-white hover:bg-highlight-900 bg-purple-800',
  buttonTransparent: 'bg-transparent hover:text-purple-900 text-gray-900',
  buttonTransparentDark: 'dark:text-gray-500',

  link: 'underline hover:no-underline text-highlight-900 break-all',
  linkDark: 'dark:text-highlight-400',
  linkify: 'rounded',
  linkifyHashtag: 'hover:bg-yellow-200 text-highlight-900 hover:text-darkmode-100',
  linkifyHashtagDark: 'dark:text-highlight-400 dark:hover:bg-yellow-500 dark:hover:text-darkmode-500',
  linkifyMention: 'rounded text-orange-400 hover:bg-orange-400 hover:text-darkmode-1000',
  linkifyMentionDark: 'dark:hover:text-darkmode-500',
  linkifySpace: 'rounded text-orange-400 hover:bg-orange-400 hover:text-darkmode-1000',
  linkifySpaceDark: 'dark:hover:text-darkmode-500',

  dialogClickOutsideOverlay: 'inset-0 fixed',
  dialogWrapper: 'w-full top-10 mx-auto justify-center items-center flex fixed',
  dialogInner: 'bg-white bg-white divide-gray-200 divide-solid divide-y flex flex-col max-h-dialog mx-3 mx-auto relative rounded shadow-xl w-full',
  dialogInnerDark: 'dark:divide-darkmode-1000 dark:bg-darkmode-600',
  dialogHeader: 'text-xl text-center text-bold sm:px-8 py-4 p-4',
  dialogHeaderDark: 'dark:text-gray-300',
  dialogBody: 'overflow-y-auto px-4 py-4 shrink sm:px-8 sm:py-8',
  dialogFooter: 'sm:px-8 py-4 px-4 justify-between gap-y-10 flex',

  popoverRef: 'h-[30px]',
  popoverWrapper: 'bg-white rounded shadow-xl w-52 divide-gray-200 divide-solid divide-y',
  popoverWrapperDark: 'dark:divide-darkmode-1000 dark:bg-darkmode-600',
  popoverBody: 'flex flex-col gap-y-1 p-2',
  popoverBodyButton: 'flex gap-x-3 hover:bg-highlight-10 hover:text-highlight-900 items-center p-2 rounded text-gray-900 text-left text-sm',
  popoverBodyButtonDark: 'dark:hover:bg-highlight-900 dark:hover:text-white dark:text-gray-300',
  popoverSocialButtonWrapper: 'flex gap-x-5 justify-center py-3',

  sidebarWrapper: 'fixed flex flex-col h-body top-[60px] bg-white right-0 shadow-xl w-screen divide-gray-200 divide-solid divide-y z-50',
  sidebarWrapperDark: 'dark:divide-darkmode-1000 dark:bg-darkmode-600',
  sidebarWrapperPseudo: 'after:empty after:top-0 after:bottom-0 after:right-full after:w-screen after:absolute after:bg-black after:bg-opacity-30',
  sidebarHeader: 'py-3 px-4',
  sidebarHeaderLabel: 'text-xs',
  sidebarHeaderName: 'dark:text-gray-300 text-lg',
  sidebarBody: 'flex flex-col gap-y-1 p-2 grow overflow-y-auto',
  sidebarFooter: '',

  navigationAsideWrapper: 'top-[60px] sticky pt-10 flex',
  navigationAsideInner: 'max-w-full justify-between h-aside-navigation grow flex-col flex',
  navigationAsideInnerTop: '',
  navigationAsideInnerBottom: 'pb-4',
  navigationAsideButtonContainer: 'gap-y-1 flex-col flex',
  navigationAsideButton: 'cursor-pointer flex gap-x-3 hover:bg-highlight-500 hover:text-white items-center p-2 rounded-full text-gray-900 text-left text-sm',
  navigationAsideButtonDark: 'dark:hover:bg-highlight-500 dark:hover:text-white dark:text-gray-300',
  navigationAsideButtonActive: 'dark:text-highlight-500 font-bold text-highlight-900',
  navigationAsideButtonText: 'md:block hidden',
  navigationAsideButtonIcon: 'md:text-sm text-lg w-[40px]',
  navigationAsideButtonIconInvisible: 'md:text-sm opacity-0 text-lg',
  navigationAsideButtonSpacer: 'h-5',
  navigationAsideBottomInteractionWrapper: 'flex flex-col flex-col-reverse gap-3 items-center md:flex-row md:justify-between',
  navigationAsideInteractionSwitch: 'md:mt-0 mt-2',
  navigationAsideSocialButtonWrapper: 'flex flex-col gap-2 md:flex-row',
  navigationAsideSocialButton: 'hover:text-highlight-900 md:text-xl text-gray-900 text-lg',
  navigationAsideSocialButtonDark: 'dark:hover:text-white dark:text-gray-300',

  navigationBottomWrapperBorder: 'absolute bg-highlight-900 bottom-0 h-[10px] left-0 right-0',
  navigationBottomWrapper: 'bg-white bottom-0 fixed flex h-[60px] items-center left-0 right-0 shadow-neg-lg empty:hidden',
  navigationBottomWrapperDark: 'dark:divide-darkmode-1000 dark:bg-darkmode-500',
  navigationBottomInner: 'flex max-w-xl mx-auto px-3 w-full',
  navigationBottomItem: 'cursor-pointer flex flex-col grow items-center justify-center relative text-[15px] z-10',
  navigationBottomItemText: 'leading-[10px] pb-[4px] pt-[6px] text-[10px]',
  navigationBottomItemColor: 'dark:hover:text-highlight-100 dark:text-highlight-500 hover:text-purple-800 text-highlight-900',
  navigationBottomItemColorActive: 'dark:text-highlight-100 text-purple-800',

  navigationBottomPostButtonWrapper: 'group relative w-[65px]',
  navigationBottomPostButton: '-translate-y-2/4 absolute h-[65px] rounded-t-full text-2xl top-1/2 w-[65px]',
  navigationBottomPostButtonPseudo: '-bottom-[15px] absolute bg-highlight-900 group-hover:bg-purple-800 pointer-events-none top-0 w-[50vw]',
  navigationBottomPostButtonPseudoInner: '-top-[12px] absolute h-full w-full',
  navigationBottomPostButtonBefore: '-translate-x-full left-0',
  navigationBottomPostButtonBeforeDark: '',
  navigationBottomPostButtonBeforeInner: 'bg-white left-0 rounded-br-xl',
  navigationBottomPostButtonBeforeInnerDark: 'dark:bg-darkmode-500',
  navigationBottomPostButtonAfter: 'translate-x-full right-0',
  navigationBottomPostButtonAfterDark: '',
  navigationBottomPostButtonAfterInner: 'rounded-bl-xl bg-white',
  navigationBottomPostButtonAfterInnerDark: 'dark:bg-darkmode-500',

  navigationBottomMotionSpan: '-bottom-[8px] absolute h-[1px] w-[50px]',
  navigationBottomMotionSpanColor: 'bg-white',
  navigationBottomMotionSpanColorDark: 'dark:bg-highlight-100',

  virtuosoScroll2IndexWrapper: 'h-10',
  virtuosoScroll2IndexInner: 'bg-black h-10',
  virtuosoFeedItemWrapper: 'mb-5',

  postFormTextareaWrapper: 'relative',
  postFormMessageCounter: 'absolute bg-white bottom-4 empty:hidden font-mono leading-none px-2 py-1 right-4 rounded-full text-gray-400 text-xs',
  postFormMessageCounterDark: 'dark:bg-black',
  postFormFooter: 'flex justify-between mt-5',
  postFormFooterLogoWrapper: 'mr-5 items-center flex',

  postNotFound: 'text-center px-5 py-8',
  postNotFoundHeadline: 'text-3xl bold mb-3',
  postNotFoundSubline: '',

  feedWrapper: 'feed-wrapper flex flex-col gap-y-5 md:mt-10 mt-3 px-3',
  feedItemParent: 'rounded border-none shadow-sm',
  feedItemChild: 'border-gray-300 border-l',

  feedItemWrapper: 'feed-item-wrapper bg-white',
  feedItemWrapperDark: 'dark:bg-darkmode-600 dark:border-darkmode-1900 dark:divide-darkmode-200',
  feedItemInner: 'p-5 rounded',
  feedItemInnerTop: 'p-5 pt-3 rounded-t',
  feedItemInnerBottom: 'flex justify-between px-5 py-3 rounded-b',
  feedItemInnerBottomCol: 'items-center gap-x-3 flex',
  feedItemMetaWrapper: 'flex mb-2',
  feedItemMetaCol1: 'flex gap-x-2 grow items-baseline truncate',
  feedItemMetaCol2: 'flex items-baseline',
  feedItemMetaName: 'text-gray-900 font-bold',
  feedItemMetaNameDark: 'dark:text-gray-300',
  feedItemMetaTimestamp: 'text-gray-500 text-right text-xs whitespace-nowrap',
  feedItemText: 'break-words font-light overflow-hidden',
  feedItemTextDark: '',
  feedItemInteractionBar: 'flex gap-x-3',
  feedItemInteractionIcon: 'cursor-pointer hover:text-highlight-500 text-highlight-40',
  feedItemInteractionIconDark: 'dark:hover:text-highlight-400 dark:text-darkmode-1700',
  feedItemReset: 'children:children:rounded-none children:rounded-none children:shadow-none children:children:shadow-none',

  feedReplyItemWrapper: 'empty:hidden feed-reply-item-wrapper pl-7',
  feedReplyItemBar: 'empty:hidden flex items-center pt-3',
  feedReplyItemButton: 'cursor-pointer text-highlight-500 text-xs',
  feedReplyItemText: 'text-xs cursor-pointer',
  feedReplyItemSpacer: 'text-[10px] mx-2',

  startSpaceWrapper: 'flex flex-col items-center justify-center text-center',
  startSpaceTitle: 'mb-1 text-3xl text-gray-900',
  startSpaceTitleDark: 'dark:text-gray-300',
  startSpaceSubline: 'mb-4 text-md',

  spaceHeaderWrapper: 'px-5 py-7 sm:pl-7 relative rounded text-white text-shadow-sm shadow-sm',
  spaceHeaderInner: 'text-white sm:items-center sm:flex-row flex-col flex',
  spaceHeaderInnerCol1: 'sm:w-2/4 w-full text-center sm:text-left',
  spaceHeaderInnerCol2: 'mt-3 sm:mt-0 sm:w-2/4 w-full',
  spaceHeaderTitle: 'font-semibold sm:text-2xl text-xl uppercase',
  spaceHeaderDescription: 'font-light text-md pt-2',
  spaceHeaderButton: 'mt-5 mb-5 sm:mb-0',
  spaceHeaderDataWrapper: 'flex justify-evenly mx-auto text-center text-white w-full',
  spaceHeaderDataCol: 'flex-col flex',
  spaceHeaderDataTitle: 'font-bold text-2xl sm:text-4xl',
  spaceHeaderDataText: 'font-light text-xs sm:mt-2',

  userHeaderWrapper: 'bg-gradient px-5 py-7 rounded text-white',
  userHeaderInner: 'text-center text-white',
  userHeaderTitle: 'font-semibold sm:text-2xl text-xl uppercase',

  itemList: 'divide-y divide-double divide:gray-200',
  itemListDark: 'dark:divide-darkmode-1000',
  itemListBoxed: 'max-h-56 overflow-y-auto',
  itemListItem: 'py-3 px-3 group relative',
  itemListItemDark: '',
  itemListItemHoverElement: 'absolute right-3 top-1/2 -translate-y-1/2 invisible group-hover:visible',

  blackListButton: 'bg-red-400 cursor-pointer group-hover:block hidden ml-2 px-2 rounded-md text-white text-xs',

  tag: 'bg-highlight-10 font-medium inline-flex max-w-full px-2 py-1 relative rounded text-highlight-900 text-xs tracking-wide uppercase',
  tagDark: 'dark:text-highlight-400 dark:bg-darkmode-1000',
  tagClickable: 'cursor-pointer dark:hover:bg-highlight-400 dark:hover:text-darkmode-1000 hover:bg-highlight-50',
  tagEllipsis: 'truncate',
  tagCount: 'absolute -right-1 translate-x-full -translate-y-1/2 top-1/2 !text-highlight-900',
  tagCountDark: 'dark:!text-highlight-400',
  tagListRow: 'flex flex-wrap gap-3',
  tagListCol: 'flex flex-col gap-1',

  tooltip: 'bg-highlight-10 font-medium text-[10px] px-2 py-1 rounded text-highlight-900 text-xs tracking-wide uppercase shadow-sm',
  tooltipDark: 'dark:text-highlight-400 dark:bg-darkmode-1000',

  switch: 'bg-slate-300 flex h-[25px] p-[3px] rounded-full w-[40px]',
  switchDark: 'dark:bg-darkmode-600 rounded-full',
  switchInner: 'flex h-[19px] items-center justify-center rounded-full text-gray-900 w-[19px]',
  switchInnerDark: 'dark:text-white',

  alert: 'bg-highlight-100 border border-highlight-900 px-4 py-3 rounded text-highlight-900',
  alertDark: 'dark:bg-darkmode-1000 dark:border-highlight-400 dark:text-highlight-400',
  alertError: 'bg-red-100 border-red-400 text-red-700',
  alertSuccess: '',
}
// prettier-ignore-end
