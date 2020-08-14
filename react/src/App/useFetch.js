import {useState, useContext, useCallback} from 'react'

import {useErrorHandler} from 'react-error-boundary'

import SessionContext from '../Auth/sessionContext'

const useFetch = () => {
  const [error, setError] = useState()
  const [data, setData] = useState()
  const {freshBearer} = useContext(SessionContext)
  useErrorHandler(error)
  const doFetch = useCallback(
    async (uri, method, payload) => {
      const params = {
        method,
      }
      if (payload) {
        params.body = JSON.stringify(payload)
      }
      params.headers = {
        'Content-Type': 'application/json',
      }
      if (freshBearer) {
        params.headers.Authorization = freshBearer
      }
      try {
        const call = await fetch(process.env.REACT_APP_CLOUD + uri, params)
        const data = await call.json()
        setData(data)
        if (!call.ok) {
          setError(call.status)
        }
      } catch (e) {
        setError(e)
      }
    },
    [freshBearer]
  )
  return [doFetch, data]
}

export default useFetch
