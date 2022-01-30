import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { style } from 'styles/style'

interface DialogProps {
  body: string | JSX.Element[] | JSX.Element
  bodyPadding?: string
  header?: string
  footer?: JSX.Element
  width?: string
  onClose: () => void
  showDialog: boolean
}

const BaseDialog: FunctionComponent<DialogProps> = ({
  body,
  bodyPadding = style.dialogBody,
  header = null,
  footer = null,
  width = 'sm',
  onClose,
  showDialog,
}) => {
  const widthLookup: { [unit: string]: string } = {
    'sm': 'max-w-sm',
    'md': 'max-w-md',
    'lg': 'max-w-lg',
    'xl': 'max-w-xl',
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
    <Dialog open={showDialog} onClose={onClose}>
      <div className={style.dialogWrapper}>
        <Dialog.Overlay className={style.dialogOverlay} />
        <div
          className={`${style.dialogInner} ${
            style.dialogInnerDark
          } ${setWidth()}`}
        >
          {header && (
            <div
              className={`${style.dialogHeader} ${style.dialogHeaderDark}`}
            >
              {header}
            </div>
          )}
          <div className={bodyPadding}>{body}</div>
          {footer && <div className={style.dialogFooter}>{footer}</div>}
        </div>
      </div>
    </Dialog>
  )
}

export default BaseDialog
