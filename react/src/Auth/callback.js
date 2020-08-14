import React, {useEffect, useContext} from 'react'

import queryString from 'query-string'
import {Redirect} from 'react-router-dom'

import Spinner from '../App/spinner'
import useFetch from '../App/useFetch'
import SessionContext from './sessionContext'

const Callback = () => {
  const {code} = queryString.parse(window.location.search)
  const {accessToken, setAccessToken} = useContext(SessionContext)
  const [doFetch, data] = useFetch()
  useEffect(() => {
    const getToken = async () => {
      await doFetch('/auth', 'post', {code})
    }
    data || getToken()
    data &&
      (setAccessToken(data) || localStorage.setItem('isAuthenticated', 'true'))
  }, [code, doFetch, data, setAccessToken])
  return <>{accessToken ? <Redirect to="/" /> : <Spinner />}</>
}

export default Callback
