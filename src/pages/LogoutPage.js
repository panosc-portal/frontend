import React, {useContext} from "react"
import { Redirect } from "react-router-dom"
import { UserContext } from "../context/UserContext"

const Logout = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext)
return (<>{!isAuthenticated && <Redirect to={'/login'} />}
{setIsAuthenticated(false)}
</>)
}

export default Logout