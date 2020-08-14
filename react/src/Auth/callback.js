import React, {useEffect, useCallback, useContext} from 'react'
import SessionContext from './sessionContext'
import queryString from 'query-string'
import {useFetch} from '../App/helpers'
import {Redirect} from 'react-router-dom'
import Spinner from '../App/spinner'

const Callback = () => {
  const {code} = queryString.parse(window.location.search)
  const {accessToken, setAccessToken} = useContext(SessionContext)
  const [doFetch, data] = useFetch()
  const getNewToken = useCallback(
    async code => {
      await doFetch('/auth', 'post', {code})
    },
    [doFetch]
  )
  useEffect(() => {
    const getIt = async () => {
      await doFetch('/auth', 'post', {code})
      setAccessToken(data)
    }
    getIt()
  }, [])
  return (
    <>
      {console.log(data)}
      {/* {accessToken ? <Redirect to="/" /> : <Spinner />} */}
      {accessToken ? 'true' : 'false'}
    </>
  )
}

export default Callback
