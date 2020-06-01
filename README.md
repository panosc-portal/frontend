# Quickstart
`docker-compose up`
 - clones searchapi and replaces its database with mine(:5001)
 - starts an express app providing dummy cloud service(:5000)
 - starts react frontend (:3000)

 - if things go sideways, try this first: `docker-compose build --no-cache`

 - if running as individual services, set env variables manually
## Current state
 - Login / Logout disabled
 - Somewhat hard to maintain
 - If you try to break it, you will succeed..

## Codebase a little messy at this point, refactoring & some architectural changes are imminent
I've put together a list of things that I think could help make it more robust / complete
 - Rebass (w Emotion) - a simple UI component library
 - SWR - data fetching library with support for Suspense
 - Something for handling sessions (Passport.js, AUTH0, Firebase, ??)
 - typing (typescript / protypes / both?)
 - unit tests
