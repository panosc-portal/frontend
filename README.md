 # Actually working frontend
 - to some extend
 - please use on widescreen for now. otherwise will look shamefully terrible
 ## local setup
 - `yarn install`
 - `yarn start`
 - .env file, replace values according to your setup
```
REACT_APP_SEARCH=http://localhost:5000/api
REACT_APP_API=http://cloud:9080/portal/api/v1
REACT_APP_KEYCLOAK_URL=http://keycloak:8080/auth
REACT_APP_KEYCLOAK_REALM=master
REACT_APP_KEYCLOAK_CLIENT_ID=account
```
 - there's a db.json file in the root folder that you can use with search api to get the same dummy data we use
 ## helm chart
 - coming asap

 # note regarding keycloak
 - keycloak's hostname must match with the one account service gets or the tokens will not be considered valid
