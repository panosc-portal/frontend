import React from 'react'

import {useKeycloak} from '@react-keycloak/web'
import {SWRConfig} from 'swr'

//not happy with the state of data fetching at this point
const SWRProvider = ({children}) => {
  const {keycloak} = useKeycloak()
  const getUrlWithBase = url =>
    url.startsWith('/account') || url.startsWith('/plans')
      ? keycloak.authenticated
        ? process.env.REACT_APP_API + url
        : false
      : process.env.REACT_APP_SEARCH + url
  const fetcher = url => {
    const access_token = keycloak?.token ?? ''
    const method = url.endsWith('token') ? 'post' : 'get'
    return (
      url &&
      fetch(getUrlWithBase(url), {
        headers: {
          access_token,
        },
        method,
      }).then(r => r.json())
    )
  }
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
