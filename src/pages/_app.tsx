import React from 'react'
import 'styles/globals.css'
import { AppProps } from 'next/app'
import { CssBaseline } from '@mui/material'
import { ThemeProvider, useTheme } from '@mui/material/styles'
import { ApolloProvider } from '@apollo/client'
import apolloClient from 'apolloClient'
import Footer from 'components/layout/Footer'
import ReactGA from 'react-ga4'
import NavBar from 'components/layout/NavBar'
import Head from 'next/head'
import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from 'createEmotionCache'
import ToggleColorMode from 'components/context/ColorModeContext'
import { appWithTranslation } from 'next-i18next'

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('G-MKCJ96LVC7')
  ReactGA.send('pageview')
}

const clientSideEmotionCache = createEmotionCache()

function MyApp(props: AppProps & { Component: { hideMainLayout: boolean }; emotionCache: EmotionCache }) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps, router } = props
  const theme = useTheme()

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title key={'title'}>Fernand Veyrier</title>
        <meta property="og:title" content="Fernand Veyrier" key="ogtitle" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          key={'description'}
          name="description"
          content="I am Fernand Veyrier, gameplay and fullstack programmer. This portfolio mostly focuses on video games and personal projects."
        />
        <meta
          property={'og:description'}
          content="I am Fernand Veyrier, gameplay and fullstack programmer. This portfolio mostly focuses on video games and personal projects."
          key="ogdescription"
        />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta property="og:image" content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/background.png`} />
        <meta property="og:image:secure_url" content={`https://${process.env.NEXT_PUBLIC_VERCEL_URL}/background.png`} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="576" />
      </Head>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <CssBaseline />
          {!Component.hideMainLayout && <NavBar />}
          <main>
            <Component {...pageProps} key={router.asPath} />
          </main>
          {!Component.hideMainLayout && <Footer />}
        </ApolloProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

const MainApp = (props: AppProps & { Component: { hideMainLayout: boolean }; emotionCache: EmotionCache }) => {
  return (
    <ToggleColorMode>
      <MyApp {...props} />
    </ToggleColorMode>
  )
}

export default appWithTranslation(MainApp)
