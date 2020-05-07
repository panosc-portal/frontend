import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext"
import jwt from "jsonwebtoken"

const useAxios = url => {
  const { token } = useContext(UserContext)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        process.env.REACT_APP_BACKEND
          ? process.env.REACT_APP_BACKEND + url
          : "http://localhost:5000/" + url,
          {headers: {token}}
      );
      console.log(jwt.decode(token))
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [url, token]);
  return { data, isLoading };
};

export { useAxios as useFetch };
