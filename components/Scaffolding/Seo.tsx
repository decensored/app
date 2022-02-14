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

    <meta property='og:type' content='website' />
    <meta property='og:title' content={title} name='title' />
    <meta property='og:description' content={description} name='description' />
    <meta property='og:image' content={image} name='image' />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='630' />

    <meta property='twitter:card' content='summary' />
    <meta property='twitter:title' content={title} />
    <meta property='twitter:description' content={description} />
    <meta property='twitter:image' content={image} />

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
