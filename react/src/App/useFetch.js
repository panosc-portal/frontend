import {useState, useContext, useCallback} from 'react'

import {useErrorHandler} from 'react-error-boundary'

import SessionContext from '../Auth/sessionContext'

const useFetch = () => {
  const [error, setError] = useState()
  const [data, setData] = useState()
  const {bearer} = useContext(SessionContext)
  useErrorHandler(error)
  const doFetch = useCallback(
    async (uri, method, payload) => {
      const params = {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: bearer,
        },
        //why send refresh token when not refreshing...
        credentials: 'omit',
      }
      if (payload) {
        params.body = JSON.stringify(payload)
      }
      try {
        const call = await fetch(process.env.REACT_APP_CLOUD + uri, params)
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
    [bearer]
  )
  return [doFetch, data]
}

export default useFetch
