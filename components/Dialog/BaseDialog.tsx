import React, { Fragment, FunctionComponent } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { style } from 'styles/style'

interface DialogProps {
  body: string | JSX.Element[] | JSX.Element
  bodyPadding?: string
  header?: string
  footer?: JSX.Element
  width?: string
  onClose: () => void
  clickOutside?: boolean
  showDialog: boolean
}

const BaseDialog: FunctionComponent<DialogProps> = ({
  body,
  bodyPadding = style.dialogBody,
  header = null,
  footer = null,
  width = 'sm',
  onClose,
  clickOutside = false,
  showDialog,
}) => {
  const widthLookup: { [unit: string]: string } = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
  }

  const setWidth = (): string => {
    const getWidth = widthLookup[width]
    if (!getWidth) console.warn(`${width} undefined`)
    return getWidth
  }

  return (
    <Transition show={showDialog} as={Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 scale-95'
          enterTo='opacity-100 scale-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100 scale-100'
          leaveTo='opacity-0 scale-95'
        >
          <div className={style.dialogWrapper}>
            {clickOutside && <Dialog.Overlay className={style.dialogClickOutsideOverlay} />}
            <div className={`${style.dialogInner} ${style.dialogInnerDark} ${setWidth()}`}>
              {header && <div className={`${style.dialogHeader} ${style.dialogHeaderDark}`}>{header}</div>}
              <div className={bodyPadding}>{body}</div>
              {footer && <div className={style.dialogFooter}>{footer}</div>}
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default BaseDialog
