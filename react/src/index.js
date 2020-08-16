import React from 'react'

import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'

import App from './App/app'
import ErrorBoundary from './App/errorBoundary'
import SWRProvider from './App/swrProvider'
import {SessionProvider} from './Auth/sessionContext'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <SessionProvider>
        <SWRProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </SWRProvider>
      </SessionProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
