import React, { FunctionComponent } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { style } from 'styles/style'
import QRCode from 'react-qr-code'
import BaseDialog from './BaseDialog'

interface ProfileProbs {
  showDialog: boolean
  onClose: () => void
}

const Profile: FunctionComponent<ProfileProbs> = ({ showDialog, onClose }) => {
  const key = localStorage.getItem('account_private_key')
    ? localStorage.getItem('account_private_key')
    : undefined

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Profile'
      body={
        <div className='grid grid-cols-3 gap-x-4 gap-y-8'>
          <div className='col-span-3'>
            <span
              className={`
                  ${style.dialogLabel}
                  ${style.dialogLabelDark}
                `}
            >
              Your key
            </span>
            <div className={style.inputWrapper}>
              <input
                className={`
                    ${style.input}
                    ${style.inputDark}
                  `}
                type='text'
                defaultValue={localStorage
                  .getItem('account_private_key')
                  ?.toString()}
                disabled
              />
            </div>
            <QRCode
              value={`https://v2.decensored.app/signup/${key}`}
              className='mx-auto ml-5 mt-10'
            />
          </div>
        </div>
      }
      footer={
        <button
          type='button'
          className={`
              ${style.button}
              ${style.buttonTransparent}
              ${style.buttonTransparentDark}
              basis-full
            `}
          onClick={() => onClose()}
        >
          Close
        </button>
      }
    />
  )
}

export default Profile
