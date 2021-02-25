import Keycloak from 'keycloak-js'
import {isEmpty} from 'ramda'

const config = {
  url: isEmpty(process.env.REACT_APP_KEYCLOAK_URL) ? 'http://localhost:8080/auth' : process.env.REACT_APP_KEYCLOAK_URL,
  realm: isEmpty(process.env.REACT_APP_KEYCLOAK_REALM) ? 'default' : process.env.REACT_APP_KEYCLOAK_REALM,
  clientId: isEmpty(process.env.REACT_APP_KEYCLOAK_CLIENT_ID) ? 'account' : process.env.REACT_APP_KEYCLOAK_CLIENT_ID
}

const keycloak = new Keycloak(config)

export default keycloak
