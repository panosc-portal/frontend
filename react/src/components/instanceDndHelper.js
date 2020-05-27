import {useEffect, useState} from 'react'

const getFreshInstances = (props) => {
  const [instances, setInstances] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [addNewInstance, setAddNewInstance] = useState({})

  useEffect(() => {
    const freshenInstances = async () => {
      try {
        const res = await Api.get('/instances')
        setInstances(res.data)
        setIsLoading(false)
      } catch (err) {
        console.log(err)
      }
    }
    freshenInstances()
  }, [addNewInstance])
}

export default getFreshInstances
