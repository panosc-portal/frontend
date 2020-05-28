import axios from 'axios'
import {useState, useContext, useEffect} from 'react'
import {UserContext} from '../context/UserContext.js'

const useSearchApi = (target, query) => {
  const {token} = useContext(UserContext)
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const processedQuery =
    target + '?filter=' + encodeURIComponent(JSON.stringify(query))
  console.log(processedQuery)
  useEffect(() => {
    const api = axios.create({
      baseURL: process.env.REACT_APP_SEARCHAPI,
      headers: {
        token: token
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
  }, [processedQuery, token])
  return {data, isLoading, hasError}
}

export default useSearchApi
