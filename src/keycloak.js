import Keycloak from 'keycloak-js'
import {isNil} from 'ramda'

const getConfig = () => ({
  url: isNil(process.env.REACT_APP_KEYCLOAK_URL)
    ? 'http://localhost:8080/auth'
    : process.env.REACT_APP_KEYCLOAK_URL,
  realm: isNil(process.env.REACT_APP_KEYCLOAK_REALM)
    ? 'default'
    : process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: isNil(process.env.REACT_APP_KEYCLOAK_CLIENT_ID)
    ? 'account'
    : process.env.REACT_APP_KEYCLOAK_CLIENT_ID,
})

const config = getConfig()

const keycloak = new Keycloak(config)

export default keycloak
