import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import { classNamesLib } from 'components/ClassNames/ClassNames'

interface DialogProps {
  showDialog: boolean
  onClose: () => void
  header: string
  body: string | JSX.Element[] | JSX.Element
  footer: JSX.Element[] | JSX.Element
}

const BaseDialog: FunctionComponent<DialogProps> = ({
  showDialog,
  onClose,
  header,
  body,
  footer,
}) => (
  <Dialog open={showDialog} onClose={onClose}>
    <div className={classNamesLib.dialogWrapper}>
      <Dialog.Overlay className={classNamesLib.dialogOverlay} />
      <div
        className={`${classNamesLib.dialogInner} ${classNamesLib.dialogInnerDark}`}
      >
        <div
          className={`${classNamesLib.dialogHeader} ${classNamesLib.dialogHeaderDark}`}
        >
          {header}
        </div>
        <div className={classNamesLib.dialogBody}>{body}</div>
        <div className={classNamesLib.dialogFooter}>{footer}</div>
      </div>
    </div>
  </Dialog>
)

export default BaseDialog
