import React, {useContext} from 'react'
import {Redirect} from 'react-router-dom'
import {UserContext} from '../context/UserContext'

const Logout = () => {
  const {isAuthenticated, setIsAuthenticated, setToken} = useContext(UserContext)
  return (
    <>
      {setIsAuthenticated(false)}
      {setToken('')}
      {localStorage.setItem('token', '')}
    </>
  )
}

export default Logout
