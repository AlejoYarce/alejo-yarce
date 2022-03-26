import React from 'react'
import { AppProps } from 'next/app'

import StyleProvider from '~app/styles/StyleProvider'

function App({ Component, pageProps }: AppProps) {
  return (
    <StyleProvider>
      <Component {...pageProps} />
    </StyleProvider>
  )
}

export default App
