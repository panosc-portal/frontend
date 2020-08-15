import React from 'react'

import normalize from 'normalize.css'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider, createGlobalStyle} from 'styled-components'

import App from './App/app'
import ErrorBoundary from './App/errorBoundary'
import SWRProvider from './App/swrProvider'
import theme from './App/theme'
import {SessionProvider} from './Auth/sessionContext'
import * as serviceWorker from './serviceWorker'

const GlobalStyle = createGlobalStyle`
  ${normalize}
`
ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <SessionProvider>
        <SWRProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ThemeProvider>
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
