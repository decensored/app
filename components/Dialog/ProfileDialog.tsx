import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'
import SVGIcon from 'components/Icon/SVGIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import { BrowserView } from 'react-device-detect'
import BaseDialog from './BaseDialog'

interface ProfileProbs {
  showDialog: boolean
  onClose: () => void
}

const Profile: FunctionComponent<ProfileProbs> = ({ showDialog, onClose }) => {
  const getAccountPrivateKey = ():string => {
    const key = localStorage.account_private_key || 'No key found'
    return key
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
                  defaultValue={getAccountPrivateKey()}
                  readOnly
                />
                <CopyToClipboard
                  text={getAccountPrivateKey()}
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
          <BrowserView>
            <div>
              <div className='flex justify-center mb-3'>
                <QRCode
                  className='rounded'
                  fgColor='#2d3294'
                  value={`https://v2.decensored.app/signup/${getAccountPrivateKey()}`}
                />
              </div>
              <span
                className={`
                  ${style.inputLabel}
                  ${style.inputLabelDark}
                  ${style.inputLabelCenter}
                `}
              >
                Switch to mobile
              </span>
            </div>
          </BrowserView>
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
