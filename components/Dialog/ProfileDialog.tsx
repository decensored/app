import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'
import SVGIcon from 'components/Icon/SVGIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import BaseDialog from './BaseDialog'

interface ProfileProbs {
  showDialog: boolean
  onClose: () => void
}

const Profile: FunctionComponent<ProfileProbs> = ({ showDialog, onClose }) => {
  let key = localStorage.getItem('account_private_key')
    ? localStorage.getItem('account_private_key')
    : undefined

  if (typeof key !== 'string') {
    key = 'No key found'
  }

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
              <div className={style.inputGroup}>
                <input
                  className={`
                      ${style.input}
                      ${style.inputDark}
                      rounded-r-none
                    `}
                  type='text'
                  id='private-key'
                  defaultValue={key}
                  readOnly
                />
                <CopyToClipboard
                  text={key}
                  onCopy={() => toast(`Key copied to clipboard`)}
                >
                  <button
                    type='button'
                    className={`
                      ${style.button}
                      ${style.buttonDecensored}
                      rounded-l-none
                    `}
                  >
                    <SVGIcon icon='faClipboard' isFixed />
                  </button>
                </CopyToClipboard>
              </div>
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
