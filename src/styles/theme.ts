import emotionStyled from '@emotion/styled'

import colors from './colors'

const heights = {
  navbar: 6,
  navbarSm: 5.5,
  footer: 6.5,
}

const zIndex = {
  under: -1,
  ground: 0,
  initial: 1,
  navBar: 10,
  topLevel: 5,
  modal: 100,
}

export const theme = {
  colors,
  heights,
  zIndex,
}

export type ThemeType = typeof theme

declare module "@emotion/react" {
  export interface Theme extends ThemeType {}
}

export const styled = emotionStyled
