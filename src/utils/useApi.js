import axios from "axios";
import {
  useState,
  useEffect,
  useContext
} from "react";
import {
  UserContext
} from "../context/UserContext"

const useApi = ({
  path,
  method,
  body,
}) => {
  const {
    token
  } = useContext(UserContext)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const callApi = async () => {
      if (path) {
        setIsLoading(true)
        const result = await axios({
          url: process.env.REACT_APP_API + path,
          method,
          data: body,
          headers: {
            token
          }
        });
        setData(result.data)
        setIsLoading(false)
      }
    };
    callApi();
  }, [body, method, path, token]);


  return {
    data,
    isLoading
  };
}

export default useApi;