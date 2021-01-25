import Keycloak from 'keycloak-js'

const keycloak = new Keycloak({
  url: process.env.REACT_APP_KEYCLOAK_URL ?? 'http://localhost:8080/auth',
  realm: process.env.REACT_APP_KEYCLOAK_REALM ?? 'default',
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID ?? 'account',
})

export default keycloak
