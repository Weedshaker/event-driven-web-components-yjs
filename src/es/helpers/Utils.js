export const urlFixProtocol = url => {
  return url.replace('ws:', 'http:').replace('wss:', 'https:')
}