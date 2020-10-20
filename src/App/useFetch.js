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
          access_token: keycloak?.token ?? '',
        },
      }
      if (payload) {
        params.body = JSON.stringify(payload)
      }
      try {
        const call = await fetch(process.env.REACT_APP_API + uri, params)
        if (!call.ok) {
          setError(call.status)
        } else {
          const data = await call.json()
          setData(data)
        }
      } catch (e) {
        setError(e)
      }
    },
    [keycloak.token]
  )
  return [doFetch, data]
}

export default useFetch
