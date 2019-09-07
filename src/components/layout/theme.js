import { rgba } from './base'

export const Theme = {
  searchBarHeight: '9rem',
  searchBarHeightXS: '7.2rem',
  searchResultListHeight: '25rem',
}

// PLEASE KEEP THIS ALPHABETICAL
export const Color = {
  alabaster: '#f7f7f7',
  alto: '#d0d0d0',
  bastille: '#201C28',
  black: '#000000', // Brand color approved
  boulder: '#7d7d7d',
  cararra: '#e6e6dc', // Brand color approved
  cardinal: '#bb203b',
  caribbeanGreen: '#00dea6', // Brand color approved
  darkCharcoal: '#333333',
  dustyGray: '#9a9999',
  eyebrow: '#8f8f8f',
  flamingo: '#f26522',
  fuelYellow: '#f1ad27',
  gallery: '#eeeeee',
  gray: '#888888',
  darkGray: '#434343',
  lightGray: '#dadada',
  mercury: '#e5e5e5',
  mineShaft: '#222222',
  monaLisa: '#ffa58a', // Brand color approved
  purple: '#a582e3', // Brand color approved
  purpleDarken: '#9b74e0',
  radicalRed: '#ff3d5e', // Brand color approved
  radicalRedDarken: '#ff2c50',
  roseBudCherry: '#870d4f', // Brand color approved
  royalBlue: '#3141eb', // Brand color approved
  silver: '#cccccc',
  silverChalice: '#a1a1a1',
  supernova: '#ffcd00', // Brand color approved
  transparent: 'transparent',
  tuna: '#32323c', // Brand color approved
  white: '#ffffff',
  brightTurquoise: '#07cbff',
  whiteApprox: '#fefefe',
  blueRibbon: '#0058ff',
  cyan: '#00ffff',
  wildSand: '#f4f4f4',
  moonMist: '#E0E2D6',
}

export const Border = {
  lightGray: `solid 0.05rem ${Color.lightGray}`,
  royalBlue: `solid 0.25rem ${Color.royalBlue}`,
  mercury: `solid 0.1rem ${Color.mercury}`,
}

export const Shadows = {
  hero: `0 0.125rem 0.5rem ${rgba(Color.black, 0.16)}`,
}

export const MapConfig = {
  minZoom: 0,
  initialZoom: 4,
  country: 5,
  bigCity: 10,
  exploration: 11,
  detail: 15,
  cardZoom: 13,
  maxZoom: 20,
  defaultLocation: [-95.712891, 37.09024], // US Aprox Center.
  countryLevelRadius: 1500,
  nearbyLevelRadius: 50,
}

export const SsSocialRegularIcons = {
  facebook: '\\ea91',
  instagram: '\\ea92',
  twitter: '\\ea96',
  youtube: '\\ea9d',
}
