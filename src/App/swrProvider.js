import React from 'react'

import {useKeycloak} from '@react-keycloak/web'
import {SWRConfig} from 'swr'

//not happy with the state of data fetching at this point
const SWRProvider = ({children}) => {
  const {keycloak} = useKeycloak()
  const config = {
    headers: {access_token: keycloak.token},
  }
  const getUrlWithBase = url => {
    if (url.endsWith('token')) {
      config.method = 'post'
    } else {
      config.method = 'get'
    }
    return url.startsWith('/account') || url.startsWith('/plans')
      ? keycloak.authenticated
        ? process.env.REACT_APP_API + url
        : false
      : process.env.REACT_APP_SEARCH + url
  }
  const fetcher = url =>
    url && fetch(getUrlWithBase(url), config).then(r => r.json())
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
