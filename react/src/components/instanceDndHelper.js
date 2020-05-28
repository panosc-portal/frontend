import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/UserContext.js'

const useFreshInstances = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newInstance, setNewInstance] = useState({})
  const [hasError, setHasError] = useState(false)
  const {token} = useContext(UserContext)
  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_CLOUDAPI,
      headers: {
        token: token
      }
    })
    const freshenInstances = async () => {
      try {
        const res = await api.get('/instances')
        setData(res.data)
        setIsLoading(false)
        setHasError(false)
      } catch (err) {
        setHasError(true)
        setIsLoading(false)
      }
    }
    freshenInstances()
  }, [newInstance, token])
  return [{data, isLoading, hasError}, setNewInstance]
}

export default useFreshInstances
