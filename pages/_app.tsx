import type { AppProps } from 'next/app'
import React, { FunctionComponent } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'styles/styles.scss'
import { style } from 'styles/style'
import VersionCheck from 'components/BrowserOnly/VersionCheck'
import Web3Client from 'components/BrowserOnly/Web3Client'
import useDarkmodeSwitch from 'hooks/useDarkmodeSwitch.js'
import useViewportHeightCalculation from 'hooks/useViewportHeightCalculation.js'
import { inBrowser } from 'lib/where'
import 'lib/polling/polling_accounts'
import 'lib/polling/polling_spaces'
import 'lib/polling/polling_posts'
import Seo from 'components/Scaffolding/Seo'
import Header from 'components/Scaffolding/Header'
import AsideNavigation from 'components/Scaffolding/AsideNavigation'
import BottomNavigation from 'components/Scaffolding/BottomNavigation'

const MyApp: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Seo />
    <Header />
    <div className={style.bodyContainer}>
      <div className={`${style.bodyContainerCol1}`}>
        <AsideNavigation />
      </div>
      <div className={style.bodyContainerCol2}>
        <Component {...pageProps} />
      </div>
    </div>
    <BottomNavigation />

    {useViewportHeightCalculation()}
    {useDarkmodeSwitch()}

    {inBrowser && (
      <>
        <VersionCheck />
        <Web3Client />
      </>
    )}

    <ToastContainer autoClose={2000} pauseOnHover={false} newestOnTop position={toast.POSITION.TOP_CENTER} />
  </>
)

export default MyApp
