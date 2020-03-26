import handles from '../handles.csv'

const h2w = handles.reduce((m, {handle, webId}) => {
  m[handle] = webId
  return m
}, {})

const w2h = handles.reduce((m, {handle, webId}) => {
  m[webId] = handle
  return m
}, {})

export const handleToWebId = handle => {
  return h2w[handle]
}

export const webIdToHandle = handle => {
  return w2h[handle]
}
