 # Frontend
 - Now compatible both with Search API and API Service to some extend. Please feel free to test and provide feedback.
 - Please use on wider screens for now.
 ## Local setup
  - .env file, replace values according to your setup
```
REACT_APP_SEARCH=http://SEARCHAPI/api
REACT_APP_API=http://APISERVICE/portal/api/v1
REACT_APP_KEYCLOAK_URL=http://KEYCLOAK/auth
REACT_APP_KEYCLOAK_REALM=REALM
REACT_APP_KEYCLOAK_CLIENT_ID=CLIENTID
```
  - Keycloak's hostname must match with the one account service gets or the tokens will not be considered valid.
 - `yarn install`
 - `yarn start`
 - There's a db.json file in the root folder that you can use as database for Search API.
 ## Helm chart
 - asap
