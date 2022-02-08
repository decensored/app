import React, { FunctionComponent } from 'react'
import { Head, Html, Main, NextScript } from 'next/document'
import { style } from 'styles/style'

const DecensoredDocument: FunctionComponent = () => (
  <Html>
    <Head />
    <body className={`${style.body} ${style.bodyDark} h-viewport`}>
      <Main />
      <NextScript />
    </body>
  </Html>
)

export default DecensoredDocument
