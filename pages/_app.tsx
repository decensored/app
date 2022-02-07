import type { AppProps } from 'next/app'
import React, { FunctionComponent } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { toast, ToastContainer } from 'react-toastify'
import 'styles/globals.scss'
import VersionCheck from 'components/BrowserOnly/VersionCheck'
import Web3Client from 'components/BrowserOnly/Web3Client'
import DarkmodeToggle from 'components/Darkmode/DarkmodeToggle'
import CalculateViewportHeight from 'components/Viewport/CalculateViewportHeight'
import { inBrowser } from 'lib/where'
import 'lib/polling/polling_accounts'
import 'lib/polling/polling_spaces'
import 'lib/polling/polling_posts'

declare module 'react-helmet-async' {
  export interface HelmetProps {
    prioritizeSeoTags?: boolean
  }
}

const title = 'Decensored'
const description = 'Decentralised Web3 Social Media. Powered by IOTA. Owned by You.'
const image = `${inBrowser ? window.origin : 'https://decensored.app'}/social/shareimage.webp`

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <HelmetProvider>
      <Helmet prioritizeSeoTags>
        <title>Decensored</title>
        <meta name='description' content='' />

        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={image} />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />

        <link rel='icon' href='/favicon/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/favicon/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon/favicon-16x16.png' />
        <link rel='manifest' href='/favicon/site.webmanifest' />
        <link rel='mask-icon' href='/favicon/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Helmet>
    </HelmetProvider>

    <Component {...pageProps} />

    <DarkmodeToggle />
    <CalculateViewportHeight />

    <ToastContainer autoClose={2000} pauseOnHover={false} newestOnTop position={toast.POSITION.TOP_CENTER} />

    {inBrowser && (
      <>
        <VersionCheck />
        <Web3Client />
      </>
    )}
  </>
)

export default MyApp
