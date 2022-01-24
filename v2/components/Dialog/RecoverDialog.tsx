import React, { FunctionComponent } from 'react'
import useStore from 'lib/store'
import { classNamesLib } from 'components/ClassNames/ClassNames'
import BaseDialog from 'components/Dialog/BaseDialog'

const RecoverDialog: FunctionComponent = () => {
  const { isOpenRecoverDialog, setIsOpenRecoverDialog } = useStore((state) => ({
    isOpenRecoverDialog: state.isOpenRecoverDialog,
    setIsOpenRecoverDialog: state.setIsOpenRecoverDialog,
  }))

  const handleClose = (): void => {
    setIsOpenRecoverDialog(false)
  }

  return (
    <BaseDialog
      showDialog={isOpenRecoverDialog}
      onClose={handleClose}
      header='Recover'
      body={
        <form id='RecoverForm'>
          <input
            className={`${classNamesLib.input} ${classNamesLib.inputDark}`}
            type='text'
            placeholder='Enter your key'
            id='recoverykey'
          />
        </form>
      }
      footer={
        <>
          <button
            type='button'
            className={`
                ${classNamesLib.button}
                ${classNamesLib.buttonTransparent}
                ${classNamesLib.buttonTransparentDark}
                basis-full
              `}
            onClick={handleClose}
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
        </>
      }
    />
  )
}

export default RecoverDialog
