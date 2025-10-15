export const urlHttpProtocol = url => {
  return url.replace('ws:', 'http:').replace('wss:', 'https:')
}

export const urlRemoveProtocolRegex = /(^\w+:|^)\/\//

export const urlRemoveProtocol = url => {
  return url.replace(urlRemoveProtocolRegex, '')
}
