import type { NextPage } from 'next'
import Head from 'next/head'
import HelloWorld from 'components/HelloWorld'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Decensored</title>
        <meta name="description" content="Decensored" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <HelloWorld />
      </main>
    </>
  )
}

export default Home
