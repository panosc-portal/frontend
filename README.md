 # Frontend
 - Now compatible both with Search API and API Service to some extent. Please feel free to test and provide feedback.
 
 ## Local setup
  - .env file, replace values accordingly to your setup
```
REACT_APP_SEARCH=http://SEARCHAPI/api
REACT_APP_API=http://APISERVICE/portal/api/v1
REACT_APP_DESKTOP_WEB=http://DESKTOPSERVICEWEBTESTCLIENT/instances
REACT_APP_KEYCLOAK_URL=http://KEYCLOAK/auth
REACT_APP_KEYCLOAK_REALM=REALM
REACT_APP_KEYCLOAK_CLIENT_ID=CLIENTID
REACT_APP_TOKEN_VALID_DURATION_S=10
```
  - Keycloak's hostname must match with the one account service gets or the tokens will not be considered valid.
 - `yarn install`
 - `yarn start`
 - There's a db.json file in the root folder that you can use as database for Search API.
 ## Helm chart
 - asap
