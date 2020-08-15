# Quickstart
## Spin up required backend services
`docker-compose up`
 - clones searchapi and replaces its database (:5001)
 - starts an express app providing dummy cloud service(:5000)
## Start react app
`yarn install` & `yarn start`

# To do
 - [ ] Get a 'clearer' idea of this app's scope in terms of functionality
    - [ ] Create a list of requirements (pull requests) to related services so that it can be full-filled
 - [x] better UI components (better ~ extendable, not a huge pile of :poop:)
   - using rebass with styled-components
   - [ ] Make it look crisp
   - [ ] Make it responsive
 - [x] more robust data fetching with support for caching and other more 'advanced' features
   - SWR library
 - [x] Better dataset DnD functionality
 - [x] Add pagination
    - [x] Improve pagination
    - react-window with infinite scroll
 - [ ] Search Query builder that isn't :poop:
 - [ ] User Dashboard
 - [x] Session handling
   - mock session using OIDC with Github
     - access tokens stored in runtime
     - refresh tokens stored as http-only cookies
 - [ ] Typing
 - [ ] Unit tests
 - [ ] Add missing formal details to this repository
