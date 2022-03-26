import { css } from '@emotion/react'

export const breakpoints = {
  sm: 425,
  md: 768,
  lg: 1024,
  lgs: 1150,
  lgm: 1250,
  lgl: 1350,
  xl: 1440,
}

export type Breakpoint = keyof typeof breakpoints

export const mq = (key: Breakpoint) => {
  return (template: TemplateStringsArray, ...args: any[]) =>
    css`
      @media (min-width: ${breakpoints[key]}px) {
        ${css(template, ...args)};
      }
    `
}

export const mqMax = (key: Breakpoint) => {
  return (template: TemplateStringsArray, ...args: any[]) =>
    css`
      @media (max-width: ${breakpoints[key]}px) {
        ${css(template, ...args)};
      }
    `
}
