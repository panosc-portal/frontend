import React, {createContext, useCallback, useEffect, useState} from 'react'

import useAuthFetch from './useAuthFetch'

const SessionContext = createContext()

export const SessionProvider = props => {
  const [accessToken, setAccessToken] = useState()
  const doAuth = useAuthFetch()

  const login = useCallback(
    async code => {
      const token = await doAuth('login', code)
      setAccessToken(token)
      localStorage.setItem('isAuthenticated', 'true')
    },
    [doAuth]
  )

  const logout = useCallback(async () => {
    await doAuth('logout')
    setAccessToken()
    localStorage.removeItem('isAuthenticated')
  }, [doAuth])

  const refresh = useCallback(async () => {
    const token = await doAuth('refresh')
    setAccessToken(token)
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
    <SessionContext.Provider value={{bearer, login, logout, refresh}}>
      {props.children}
    </SessionContext.Provider>
  )
}

export default SessionContext
