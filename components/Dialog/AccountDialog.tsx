import React, { FunctionComponent } from 'react'
import { style } from 'styles/style'
import SVGIcon from 'components/Icon/SVGIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import QRCode from 'react-qr-code'
import { toast } from 'react-toastify'
import { BrowserView } from 'react-device-detect'
import { inBrowser } from 'lib/where'
import BaseDialog from './BaseDialog'

interface AccountDialogProbs {
  showDialog: boolean
  onClose: () => void
}

const AccountDialog: FunctionComponent<AccountDialogProbs> = ({ showDialog, onClose }) => {
  const getAccountPrivateKey = (): string => {
    const key = localStorage.account_private_key || 'No key found'
    return key
  }

  const qrcode = `${inBrowser ? window.origin : ''}/signup/${getAccountPrivateKey()}`
  // console.log(qrcode)

  return (
    <BaseDialog
      showDialog={showDialog}
      onClose={onClose}
      header='Account'
      body={
        <>
          <div className={style.inputWrapper}>
            <span
              className={`
                  ${style.inputLabel}
                  ${style.inputLabelDark}
                `}
            >
              Your secret account key
            </span>
            <div className={style.inputGroup}>
              <input
                className={`
                  ${style.input}
                  ${style.inputDefault}
                  ${style.inputDefaultDark}
                  ${style.inputFocus}
                  rounded-r-none
                `}
                type='text'
                id='private-key'
                defaultValue={getAccountPrivateKey()}
                readOnly
              />
              <CopyToClipboard text={getAccountPrivateKey()} onCopy={() => toast(`Key copied to clipboard`)}>
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
          <BrowserView>
            <>
              <div className='flex justify-center py-3'>
                {/* fgColor='#2d3294' */}
                <QRCode className='rounded' value={qrcode} />
              </div>
              <span
                className={`
                  ${style.inputLabel}
                  ${style.inputLabelDark}
                  ${style.inputLabelCenter}
                `}
              >
                Scan on mobile
              </span>
            </>
          </BrowserView>
        </>
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

export default AccountDialog
