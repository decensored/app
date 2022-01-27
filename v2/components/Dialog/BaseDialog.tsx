import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { classNamesLib } from 'components/ClassNames/ClassNames'

interface DialogProps {
  body: string | JSX.Element[] | JSX.Element
  bodyPadding?: string
  header?: string
  footer?: JSX.Element
  onClose: () => void
  showDialog: boolean
}

const BaseDialog: FunctionComponent<DialogProps> = ({
  body,
  bodyPadding = classNamesLib.dialogBody,
  footer = null,
  header = null,
  onClose,
  showDialog,
}) => (
  <Dialog open={showDialog} onClose={onClose}>
    <div className={classNamesLib.dialogWrapper}>
      <Dialog.Overlay className={classNamesLib.dialogOverlay} />
      <div
        className={`${classNamesLib.dialogInner} ${classNamesLib.dialogInnerDark}`}
      >
        {header && (
          <div
            className={`${classNamesLib.dialogHeader} ${classNamesLib.dialogHeaderDark}`}
          >
            {header}
          </div>
        )}
        <div className={bodyPadding}>{body}</div>
        {footer && <div className={classNamesLib.dialogFooter}>{footer}</div>}
      </div>
    </div>
  </Dialog>
)

export default BaseDialog
