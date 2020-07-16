import React from 'react'
import {SWRConfig} from 'swr'

//this could also be cleaner
const SWRProvider = ({children}) => {
  const baseUrl = process.env.REACT_APP_SEARCH
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

