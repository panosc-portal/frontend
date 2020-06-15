import axios from 'axios'
import {useState, useEffect} from 'react'
// import {UserContext} from '../context/UserContext'
// const {token} = useContext(UserContext)
const token = 'hjkdsl'

export const useSearchApi = (target, query) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const processedQuery =
    target + '?filter=' + encodeURIComponent(JSON.stringify(query))
  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_SEARCHAPI,
      headers: {
        token
      }
    })
    const makeTheCall = async () => {
      try {
        setIsLoading(true)
        const response = await api.get(processedQuery)
        setData(response.data)
        setIsLoading(false)
        setHasError(false)
      } catch (err) {
        setHasError(true)
        setIsLoading(false)
        setData([{error: err}])
      }
    }
    makeTheCall()
  }, [processedQuery])
  return {data, isLoading, hasError}
}

export const fakeCloudService = axios.create({
  baseURL: process.env.REACT_APP_EXPRESS,
  headers: {
    token
  }
})

export const useFakeCloudService = (target) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const url = process.env.REACT_APP_EXPRESS + target
  useEffect(() => {
    const makeTheCall = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get(url)
        setData(response.data)
        setIsLoading(false)
        setHasError(false)
      } catch (err) {
        setHasError(true)
        setIsLoading(false)
        setData([{error: err}])
      }
    }
    makeTheCall()
  }, [target, url])
  return {data, isLoading, hasError}
}

export const useFreshInstances = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [newInstance, setNewInstance] = useState({})
  const [hasError, setHasError] = useState(false)
  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_EXPRESS,
      headers: {
        token
      }
    })
    const freshenInstances = async () => {
      try {
        const res = await api.get('instances')
        setData(res.data)
        setIsLoading(false)
        setHasError(false)
      } catch (err) {
        setHasError(true)
        setIsLoading(false)
      }
    }
    freshenInstances()
  }, [newInstance])
  return [{data, isLoading, hasError}, setNewInstance]
}
