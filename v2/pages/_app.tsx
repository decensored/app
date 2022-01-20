import type { AppProps } from 'next/app'
import React from 'react'
import { Helmet } from 'react-helmet'
import '@fortawesome/fontawesome-svg-core/styles.css' // without it fontawesome doesnt work
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Helmet>
        <title>Decensored</title>
        <meta name='description' content='Decensored' />
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
        <body className='font-sans bg-slate-100 dark:bg-black text-gray-900 dark:text-gray-500' />
      </Helmet>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
