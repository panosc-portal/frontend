import {SWRConfig} from 'swr'
import React from 'react'

//this could also be cleaner
const SWRProvider = ({children}) => {
  const getUrlWithBase = url =>
    url.startsWith('/instances') || url.startsWith('/flavours')
      ? process.env.REACT_APP_CLOUD + url
      : process.env.REACT_APP_SEARCH + url
  const fetcher = url => fetch(getUrlWithBase(url)).then(r => r.json())
  return (
    <SWRConfig
      value={{
        suspense: true,
        fetcher,
      }}
    >
      {children}
    </SWRConfig>
  )
}

export default SWRProvider
