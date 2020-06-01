import React, {useState, useEffect} from 'react'
import jwt from 'jsonwebtoken'

export const UserContext = React.createContext()

const UserProvider = (props) => {
  const [token, setToken] = useState('')
  const [user, setUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const localToken = localStorage.getItem('token')

  useEffect(() => {
    token === '' &&
      localToken != null &&
      localToken != null &&
      setToken(localToken)
    token !== '' &&
      (setUser(jwt.decode(token).user) || setIsAuthenticated(true))
  }, [token, localToken])
  return (
    <UserContext.Provider
      value={{token, setToken, user, isAuthenticated, setIsAuthenticated}}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
