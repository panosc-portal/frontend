import {useState} from 'react'

import {useErrorHandler} from 'react-error-boundary'

const useAuthFetch = () => {
  const [error, setError] = useState()
  useErrorHandler(error)
  const doAuth = async (action, code) => {
    const params = {
      //should be 'same-origin' in production
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const doFetch = async () => {
      try {
        const call = await fetch(process.env.REACT_APP_AUTH, params)
        const data = await call.json()
        if (call.ok) {
          return data
        } else {
          setError(call.status)
          return false
        }
      } catch (e) {
        setError(e)
        return false
      }
    }

    switch (action) {
      case 'login':
        params.method = 'post'
        params.body = JSON.stringify({code})
        break
      case 'refresh':
        params.method = 'get'
        break
      default:
      case 'logout':
        params.method = 'delete'
        await doFetch()
        return null
    }

    const response = await doFetch()
    return response
  }
  return doAuth
}

export default useAuthFetch
