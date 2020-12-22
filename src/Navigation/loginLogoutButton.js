import {useKeycloak} from '@react-keycloak/web'

const LoginLogoutButton = () => {
  const {keycloak} = useKeycloak()
  return keycloak.authenticated
    ? {onClick: () => keycloak.logout(), name: 'Logout'}
    : {onClick: () => keycloak.login(), name: 'Login'}
}

export default LoginLogoutButton
