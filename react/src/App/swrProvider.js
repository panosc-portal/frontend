import React from 'react'

import {useKeycloak} from '@react-keycloak/web'
import {SWRConfig} from 'swr'

const SWRProvider = ({children}) => {
  const {keycloak} = useKeycloak()
  const getUrlWithBase = url =>
    url.startsWith('/account') || url.startsWith('/plans')
      ? process.env.REACT_APP_API + url
      : process.env.REACT_APP_SEARCH + url
  const fetcher = url =>
    fetch(getUrlWithBase(url), {
      headers: {access_token: keycloak.authenticated ? keycloak.token : ''},
    }).then(r => r.json())
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
