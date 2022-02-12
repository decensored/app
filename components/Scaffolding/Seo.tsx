import React, { FunctionComponent } from 'react'
import Head from 'next/head'

interface SeoProps {
  title?: string
  description?: string
  author?: string
  image?: string
}

const Seo: FunctionComponent<SeoProps> = ({
  title = 'Decensored',
  description = 'Decentralised Web3 Social Media. Powered by IOTA. Owned by You.',
  author,
  image = 'https://decensored.app/social/shareimage.webp',
}) => (
  <Head>
    <title>{title}</title>
    <meta name='description' content={description} />
    {author && <meta name='author' content={author} />}

    <meta name='title' property='og:title' content={title} />
    <meta name='description' property='og:description' content={description} />
    <meta name='image' property='og:image' content={image} />
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
  </Head>
)

export default Seo
