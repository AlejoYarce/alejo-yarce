import { css } from '@emotion/core'
import { omit } from 'lodash'

export const breakpoints = {
  xsm: 370,
  sm: 768,
  md: 1024,
  lg: 1440,
  xlg: 2000,
}

export const getMatchMedias = () => {
  const matchMedias = {
    xs: `(max-width: ${breakpoints.sm - 1}px)`,
    sm: `(max-width: ${breakpoints.md - 1}px) and (min-width: ${
      breakpoints.sm
    }px)`,
    md: `(max-width: ${breakpoints.lg - 1}px) and (min-width: ${
      breakpoints.md
    }px)`,
    lg: `(min-width: ${breakpoints.lg}px)`,
  }

  return Object.keys(matchMedias).reduce((acc, key) => {
    acc[matchMedias[key]] = [window.matchMedia(matchMedias[key]), key]
    return acc
  }, {})
}
export const matchMedias = {
  isXs: `(max-width: ${breakpoints.sm - 1}px)`,
  isSm: `(max-width: ${breakpoints.sm}px) and (min-width: ${breakpoints.md
    - 1}px)`,
  isMd: `(max-width: ${breakpoints.md}px) and (min-width: ${breakpoints.lg
    - 1}px)`,
  isLg: `(min-width: ${breakpoints.lg}px)`,
}

const mq = Object.keys(breakpoints).reduce((accumulator, label) => {
  const prefix = typeof breakpoints[label] === 'string' ? '' : 'min-width:'
  const suffix = typeof breakpoints[label] === 'string' ? '' : 'px'
  accumulator[label] = cls => css`
      @media (${prefix + breakpoints[label] + suffix}) {
        ${cls};
      }
    `
  return accumulator
}, {})

/**
 * makeResponsive function creates all the middle points for every breakpoint using a min/max
 * @param {Array} responsiveBlock - Usage: [{ property:string, min:number, max:number, unit:string}]
 * @returns {String} Emotion CSS block
 */
export const makeResponsive = (responsiveBlock) => {
  const reducedMq = omit(mq, 'xsm')
  const deltas = responsiveBlock.map(item => ({
    ...item,
    delta: (item.max - item.min) / 3,
    first: `
      ${item.property}: ${item.min}${item.unit || ''};
    `,
  }))

  return Object.keys(reducedMq).reduce(
    (acc, breakpoint, idx) => css`
      ${acc} ${reducedMq[breakpoint](css`
        ${deltas.reduce((group, delta) => `
            ${group}
            ${delta.property}: ${delta.min
            + delta.delta * (idx + 1)}${delta.unit || ''};
          `, '')};
      `)};
    `,
    deltas.reduce(
      (firsts, delta) => css`
        ${firsts} ${delta.first};
      `,
      '',
    ),
  )
}

/**
 * rgba function converts an hexa value with alpha channel into a rgba value
 * @param {string} hex - With the hexa value like #ffffff or the shortcut #fff
 * @param {number} alpha - with the alpha channel
 * @returns {String} rgba(r,g,b,a) string to use as css value
 */
export const rgba = (hex, alpha = 1) => {
  const getInt = val => parseInt(val, 16)
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  if (!result) {
    result = /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex)

    if (!result) {
      return ''
    }

    result[1] = `${result[1]}${result[1]}`
    result[2] = `${result[2]}${result[2]}`
    result[3] = `${result[3]}${result[3]}`
  }

  return `rgba(${getInt(result[1])}, ${getInt(result[2])}, ${getInt(
    result[3],
  )}, ${alpha})`
}

export const getAspectTops = (images = []) => {
  const viewportsMap = {
    Default: { mq: '', order: 0, imgSize: 'sm' },
    Tablet: { mq: 'sm', order: 1, imgSize: 'lg' },
    Desktop: { mq: 'md', order: 2, imgSize: 'lg' },
    'Big Screens': { mq: 'lg', order: 3, imgSize: 'lg' },
  }

  return images
    .sort(
      (a, b) => viewportsMap[a.viewport].order - viewportsMap[b.viewport].order,
    )
    .reduce((acc, item) => {
      const { width, height } = item.image.file.details.image
      let style

      if (viewportsMap[item.viewport].mq) {
        const viewport = viewportsMap[item.viewport]
        style = mq[viewport.mq](css`
          top: calc((${height} * 100vw / ${width}) - 1rem);
        `)
      } else {
        style = css`
          top: calc((${height} * 100vw / ${width}) - 1rem);
        `
      }

      return css`
        ${acc} ${style};
      `
    }, css``)
}

export default mq
