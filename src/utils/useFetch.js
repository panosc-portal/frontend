import axios from "axios";
import { useState, useEffect } from "react";
// import api from "./api";

const useAxios = url => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const result = await axios(
        process.env.REACT_APP_BACKEND
          ? process.env.REACT_APP_BACKEND + url
          : "http://localhost:5000/" + url
      );
      setData(result.data);
      setIsLoading(false);
    };
    fetchData();
  }, [url]);
  return { data, isLoading };
};

// const useJson = url => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsloading] = useState(true);
//   useEffect(() => {
//     setData(api[url]);
//     setIsloading(false);
//   }, [url]);
//   return { data, isLoading };
// };

export { useAxios as useFetch };
