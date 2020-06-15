import axios from 'axios'
import {useContext, useEffect, useState} from 'react'
import {UserContext} from '../context/UserContext'

const useFreshInstances = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newInstance, setNewInstance] = useState({})
  const [hasError, setHasError] = useState(false)
  const {token} = useContext(UserContext)
  const api = axios.create({
    baseURL: process.env.REACT_APP_CLOUDAPI,
    headers: {
      token: token
    }
  })
  console.log('state of instance: ' + newInstance)
  useEffect(() => {
    const freshenInstances = async () => {
      try {
        const res = await api.get('/instances')
        setData(res.data)
        setIsLoading(false)
        setHasError(false)
        console.log(`instancRefresherSays: ${res.data[0].datasets}`)
      } catch (err) {
        console.log(err)
        setHasError(true)
        setIsLoading(false)
        setData([{err}])
      }
    }
    freshenInstances()
  }, [newInstance])
  return {data, isLoading, hasError, setNewInstance}
}

export default useFreshInstances
