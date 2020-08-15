import React, {createContext, useCallback, useEffect, useState} from 'react'

import useAuthFetch from './useAuthFetch'

const SessionContext = createContext()

export const SessionProvider = props => {
  const [accessToken, setAccessToken] = useState()
  const doAuth = useAuthFetch()

  const login = useCallback(
    async code => {
      setAccessToken(await doAuth('login', code))
      localStorage.setItem('isAuthenticated', 'true')
    },
    [doAuth]
  )

  const logout = useCallback(async () => {
    setAccessToken(await doAuth('logout'))
    localStorage.clear()
  }, [doAuth])

  const refresh = useCallback(async () => {
    setAccessToken(await doAuth('refresh'))
  }, [doAuth])

  useEffect(() => {
    if (
      localStorage.getItem('isAuthenticated') === 'true' &&
      (!accessToken || accessToken.exp < new Date())
    ) {
      refresh()
    }
  }, [refresh, accessToken])

  const bearer = accessToken ? 'Bearer ' + accessToken.token : ''

  return (
    <SessionContext.Provider
      value={{bearer, login, logout, refresh, accessToken, setAccessToken}}
    >
      {props.children}
    </SessionContext.Provider>
  )
}

export default SessionContext
