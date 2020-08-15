import React, {useContext} from 'react'

import {SWRConfig} from 'swr'

import SessionContext from '../Auth/sessionContext'

const SWRProvider = ({children}) => {
  const {bearer} = useContext(SessionContext)
  const getUrlWithBase = url =>
    url.startsWith('/instances') || url.startsWith('/flavours')
      ? process.env.REACT_APP_CLOUD + url
      : process.env.REACT_APP_SEARCH + url
  const fetcher = url =>
    fetch(getUrlWithBase(url), {headers: {Authorization: bearer}}).then(r =>
      r.json()
    )
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
