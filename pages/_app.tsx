import React from 'react'
import { AppProps } from 'next/app'

import StyleProvider from '~app/styles/StyleProvider'
import { initFirebase } from '~app/lib/firebase/client'

function App({ Component, pageProps }: AppProps) {
  initFirebase()

  return (
    <StyleProvider>
      <Component {...pageProps} />
    </StyleProvider>
  )
}

export default App
