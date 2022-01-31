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
        <div className='grid gap-y-8'>
          <div>
            <span
              className={`
                  ${style.inputLabel}
                  ${style.inputLabelDark}
                  ${style.inputLabelCenter}
                  text-center
                `}
            >
              Your secret account key
            </span>
            <div className={style.inputWrapper}>
              <div className={style.inputGroup}>
                <input
                  className={`
                      ${style.input}
                      ${style.inputDark}
                      ${style.inputFocus}
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
          </div>
          <div>
            <span
              className={`
                ${style.inputLabel}
                ${style.inputLabelDark}
                ${style.inputLabelCenter}
                text-center
              `}
            >
              Open decensored on mobile
            </span>
            <div className='flex justify-center'>
              <QRCode
                className='rounded'
                fgColor='#2d3294'
                value={`https://v2.decensored.app/signup/${key}`}
              />
            </div>
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
