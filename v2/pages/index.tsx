import type { NextPage } from 'next';
import Head from 'next/head';
import HelloWorld from 'components/HelloWorld';
import DisplayCounter from 'components/DisplayCounter';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Decensored</title>
        <meta name="description" content="Decensored" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/images/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/images/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/images/favicon/favicon-16x16.png"
        />
      </Head>

      <main>
        <HelloWorld />
        <DisplayCounter />
      </main>
    </>
  );
};

export default Home;
