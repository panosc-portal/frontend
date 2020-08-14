import React, {createContext, useCallback, useEffect, useState} from 'react'

const SessionContext = createContext()

export const SessionProvider = props => {
  const [accessToken, setAccessToken] = useState()
  const refreshToken = useCallback(async () => {
    console.log('fired token refresh')
    try {
      const response = await fetch(process.env.REACT_APP_CLOUD + '/refresh', {
        credentials: 'include',
      })
      if (!response.ok) {
        localStorage.clear()
        return null
      }
      console.log('should be getting token by now')
      const newTokens = await response.json()
      setAccessToken(newTokens)
    } catch (err) {
      throw err
    }
  }, [])
  useEffect(() => {
    console.log('fired token checker')
    if (localStorage.getItem('isAuthenticated') === 'true') {
      console.log('should be authennticated')
      if (!accessToken || accessToken.exp < new Date()) {
        console.log('should set token state now')
        refreshToken()
      }
    }
  }, [refreshToken, accessToken])

  const freshBearer = accessToken ? 'Bearer ' + accessToken.token : ''
  return (
    <SessionContext.Provider value={{freshBearer, accessToken, setAccessToken}}>
      {accessToken &&
        console.log('session returned token: ' + accessToken.token)}
      {props.children}
    </SessionContext.Provider>
  )
}

export default SessionContext
