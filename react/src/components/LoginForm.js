import React, {useState, useContext} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import {UserContext} from '../context/UserContext'
import {Redirect} from 'react-router-dom'

const LoginForm = () => {
  const [credentials, setCredentials] = useState({})
  const {setToken, isAuthenticated} = useContext(UserContext)
  const submit = async (evt) => {
    evt.preventDefault()
    const {data} = await axios.post(process.env.REACT_APP_AUTH, {...credentials})
    setToken(data.token)
    localStorage.setItem('token', data.token)
  }
  return (
    <>
      {isAuthenticated ? (
        <Redirect to={'/'} />
      ) : (
        <Form onSubmit={submit}>
          <label>Login:</label>
          <input
            type="text"
            onChange={(e) =>
              setCredentials({...credentials, username: e.target.value})
            }
          />
          <label> Password:</label>
          <input
            type="password"
            onChange={(e) =>
              setCredentials({...credentials, password: e.target.value})
            }
          />
          <input type="submit" value="Submit" />
        </Form>
      )}
    </>
  )
}

export default LoginForm

const Form = styled.form``
