import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext"

const useApi = ({path, method, data, trigger}) => {
  const {token} = useContext(UserContext)
  const [response, setResponse] = useState();
  const [waiting, setWaiting] = useState(false)
  const url = process.env.REACT_APP_CLOUD+path

useEffect(() => {
  const callApi = async () => {
    setWaiting(true)
    const result = await axios({url, method, data, headers: {token}});
    console.log(path)
    setResponse(result);
    setWaiting(false)
  };
  if (trigger) {callApi();}
}, [data, method, token, url, path, trigger]);


return { response, waiting };
}

export default useApi;
