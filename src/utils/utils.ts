export const getProtocol = (url: string) => {
  if (url.indexOf('3000') > -1) {
    return `http://${url}`
  }

  return `https://${url}`
}
