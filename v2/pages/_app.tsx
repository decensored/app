import type { AppProps } from 'next/app'
import React, { FunctionComponent } from 'react'
import { Helmet } from 'react-helmet'
import { toast, ToastContainer } from 'react-toastify'
import '@fortawesome/fontawesome-svg-core/styles.css'
import 'styles/globals.scss'
import Web3Client from 'components/Web3Client'
import SettingsDialog from 'components/Dialog/SettingsDialog'
import SignupDialog from 'components/Dialog/SignupDialog'
import RecoverDialog from 'components/Dialog/RecoverDialog'
import CreateSpaceDialog from 'components/Dialog/CreateSpaceDialog'
import DarkmodeToggle from 'components/Darkmode/DarkmodeToggle'
import { inBrowser } from 'lib/where'
import 'lib/polling/polling_spaces'
import 'lib/polling/polling_posts'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Helmet>
      <title>Decensored</title>
      <meta name='description' content='Decensored' />
      <link rel='icon' href='/favicon/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/favicon/apple-touch-icon.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/favicon/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/favicon/favicon-16x16.png'
      />
      <link rel='manifest' href='/favicon/site.webmanifest' />
      <link
        rel='mask-icon'
        href='/favicon/safari-pinned-tab.svg'
        color='#5bbad5'
      />
      <meta name='msapplication-TileColor' content='#da532c' />
      <meta name='theme-color' content='#ffffff' />
    </Helmet>

    <Component {...pageProps} />

    <SettingsDialog />
    <SignupDialog />
    <RecoverDialog />
    <CreateSpaceDialog />

    <DarkmodeToggle />

    <ToastContainer
      autoClose={2000}
      pauseOnHover={false}
      newestOnTop
      position={toast.POSITION.BOTTOM_CENTER}
    />

    {inBrowser && <Web3Client />}
  </>
)

export default MyApp
