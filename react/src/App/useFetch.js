import {useState, useCallback} from 'react'

import {useKeycloak} from '@react-keycloak/web'
import {useErrorHandler} from 'react-error-boundary'

const useFetch = () => {
  const {keycloak} = useKeycloak()
  const [error, setError] = useState()
  const [data, setData] = useState()
  useErrorHandler(error)
  const doFetch = useCallback(
    async (uri, method, payload) => {
      const params = {
        method,
        headers: {
          'Content-Type': 'application/json',
          access_token: keycloak.authenticated ? keycloak.token : '',
        },
        //why send refresh token when not refreshing...
        credentials: 'omit',
      }
      if (payload) {
        params.body = JSON.stringify(payload)
      }
      try {
        const call = await fetch(process.env.REACT_APP_API + uri, params)
        if (call.ok) {
          const data = await call.json()
          setData(data)
        } else {
          setError(call.status)
        }
      } catch (e) {
        setError(e)
      }
    },
    [keycloak.token, keycloak.authenticated]
  )
  return [doFetch, data]
}

export default useFetch
