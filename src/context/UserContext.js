import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken"

export const UserContext = React.createContext();

const UserProvider = props => {
  const [token, setToken] = useState()
  const [user, setUser] = useState({})
  useEffect(() => {
    token && setUser(jwt.decode(token).user)
  }, [token])
  return (
    <UserContext.Provider value={{ token, setToken, user }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
