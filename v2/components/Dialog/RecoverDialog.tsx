import React, { FunctionComponent } from 'react'
import { Dialog } from '@headlessui/react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const RecoverDialog: FunctionComponent = () => {
  const {
    isOpenRecoverDialog,
    setIsOpenRecoverDialog,
  } = useStore((state) => ({
    isOpenRecoverDialog: state.isOpenRecoverDialog,
    setIsOpenRecoverDialog: state.setIsOpenRecoverDialog,
  }))

  return (
    <Dialog
      open={isOpenRecoverDialog}
      onClose={() => setIsOpenRecoverDialog(false)}
    >
      <div className={classNamesLib.dialogWrapper}>
        <Dialog.Overlay className={classNamesLib.dialogOverlay} />
        <div
          className={`
            ${classNamesLib.dialogInner}
            ${classNamesLib.dialogInnerDark}
          `}
        >
          <div
            className={`
              ${classNamesLib.dialogHeader}
              ${classNamesLib.dialogHeaderDark}
            `}
          >
            Recover
          </div>
          <div className={classNamesLib.dialogBody}>
            <form id='RecoverForm'>
              <input
              className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
              type='text'
              placeholder='Enter your key'
              id='recoverykey'
            />
            </form>
          </div>
          <div className={classNamesLib.dialogFooter}>
            <button
              type='button'
              className={`
                ${classNamesLib.button}
                ${classNamesLib.buttonTransparent}
                ${classNamesLib.buttonTransparentDark}
                basis-full
              `}
              onClick={() => setIsOpenRecoverDialog(false)}
            >
              Cancel
            </button>
            <button
              type='submit'
              form='RecoverForm'
              className={`${classNamesLib.button} ${classNamesLib.buttonDecensored} basis-full`}
            >
              Recover
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default RecoverDialog
