import React from 'react'
import { ThemeProvider } from '@emotion/react'

import { theme } from './theme'
import { GlobalStyles } from './global'

const StyleProvider = ({ children }) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
)

export default StyleProvider
