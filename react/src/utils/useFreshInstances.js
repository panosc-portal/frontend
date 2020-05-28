import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/UserContext.js'

const getFreshInstances = () => {
  const [data, setInstances] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newInstance, setNewInstance] = useState({})
  const [hasError, setHasError] = useState(false)

  const {token} = useContext(UserContext)
  const api = axios.create({
    baseURL: process.env.REACT_APP_SEARCHAPI,
    headers: {
      token: token
    }
  })

  useEffect(() => {
    const freshenInstances = async () => {
      try {
        const res = await api.get('/instances')
        setInstances(res.data)
        setIsLoading(false)
        setHasError(false)
      } catch (err) {
        console.log(err)
        setHasError(true)
        setIsLoading(false)
        setInstances([{err}])
      }
    }
    freshenInstances()
  }, [newInstance])
  return {data, isLoading, hasError, setNewInstance}
}

export default getFreshInstances
