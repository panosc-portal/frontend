import axios from "axios";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken"

const useApi = (path, method, content) => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InJvbGUiOiJhZG1pbiIsIl9pZCI6IjVlOWM3Yjk0Mzk4ZGJlMTgwNTA4YzJjYSIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6InBhc3MiLCJfX3YiOjB9LCJpYXQiOjE1ODczMjA4NDIsImV4cCI6MTU4NzM2NDA0Mn0.D3aEKR_o-Abpft2kaDi5tMWt7KJ_H7QCG2h-4diFfI8'
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const url = [process.env.REACT_APP_AUTH, path].join()
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios({
        headers: {token: token},
        method: method,
        url,
        data: content
        }
      );
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [content, method, url]);
  return { data, isLoading };
};

export default useApi;
