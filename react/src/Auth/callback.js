import React, {useEffect, useContext} from 'react'

import queryString from 'query-string'
import {Redirect} from 'react-router-dom'

import Spinner from '../App/spinner'
import SessionContext from './sessionContext'

const Callback = () => {
  const {code} = queryString.parse(window.location.search)
  const {bearer, login} = useContext(SessionContext)
  useEffect(() => {
    !bearer && login(code)
  }, [bearer, code, login])
  return <>{bearer ? <Redirect to="/" /> : <Spinner />}</>
}

export default Callback
