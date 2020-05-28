# Quickstart
`docker-compose up`
 - starts a fork of search api with my demo data (:5001)
 - starts express backend (:5000) //dummy cloud api
 - starts react frontend (:3000)

## It looks like it's getting out of hands, some architectural changesare imminent
I've put together a list of packages (and also just 'stuff') that I think could help with that. It would be super helpful if some webdev master went through and reviewed it...
 - Rebass (w Emotion) - a simple UI component library
 - SWR - data fetching library with support for Suspense
 - Something for handling sessions (Passport.js, AUTH0, Firebase, ??)
 - proper Eslint setup with Husky
 - unit tests
 - docker-compose with hot-reloading for ez development

### The entire thing is ready for a rewrite using ^^^
