import React from 'react'
import {SWRConfig} from 'swr'

const SWRProvider = ({children}) => {
  const baseUrl = 'http://localhost:5001/api'
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

