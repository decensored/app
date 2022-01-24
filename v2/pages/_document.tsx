import React, { FunctionComponent } from 'react'
import { Head, Html, Main, NextScript } from 'next/document'
import { classNamesLib } from 'components/ClassNames/ClassNames'

const DecensoredDocument: FunctionComponent = () => (
  <Html>
    <Head />
    <body className={classNamesLib.body} >
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default DecensoredDocument
