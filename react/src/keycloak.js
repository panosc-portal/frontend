import Keycloak from 'keycloak-js'

// Setup Keycloak instance as needed
// // Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: 'http://keycloak:8080/auth',
  realm: 'master',
  clientId: 'account',
})

export default keycloak
