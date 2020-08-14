import React, {createContext, useCallback, useEffect, useState} from 'react'
const SessionContext = createContext()

export const SessionProvider = props => {
  const getNewToken = () => {}
  const [accessToken, setAccessToken] = useState({})
  console.log(accessToken)
  return (
    <SessionContext.Provider value={{getNewToken, accessToken, setAccessToken}}>
      {props.children}
    </SessionContext.Provider>
  )
}

export default SessionContext
