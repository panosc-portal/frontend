import React from 'react'
import {SWRConfig} from 'swr'

//this could also be cleaner
const SWRProvider = ({children}) => {
  const baseUrl = process.env.REACT_APP_SEARCH
  const fetcher = url => fetch(baseUrl + url).then(r => r.json())
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

