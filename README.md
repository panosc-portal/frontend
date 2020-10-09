 # frontend
 - please use on widescreen for now. otherwise will look shamefully terrible
 ## local setup
  - .env file, replace values according to your setup
```
REACT_APP_SEARCH=http://SEARCHAPI/api
REACT_APP_API=http://APISERVICE/portal/api/v1
REACT_APP_KEYCLOAK_URL=http://KEYCLOAK/auth
REACT_APP_KEYCLOAK_REALM=REALM
REACT_APP_KEYCLOAK_CLIENT_ID=CLIENTID
```
 - `yarn install`
 - `yarn start`
 - there's a db.json file in the root folder that you can use with search api to get the same dummy data we use
 ## helm chart
 - coming asap

 ### note regarding keycloak
 - the hostnames must match with the ones account service gets or the tokens will not be considered valid
