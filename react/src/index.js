import React from 'react'

import normalize from 'normalize.css'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider, createGlobalStyle} from 'styled-components'

import App from './App/app'
import SWRProvider from './App/swrConfigProvider'
import theme from './App/theme'
import {SessionProvider} from './Auth/sessionContext'
import * as serviceWorker from './serviceWorker'

const GlobalStyle = createGlobalStyle`
  ${normalize}
`
//Enable concurrent ui mode
ReactDOM.unstable_createRoot(document.getElementById('root')).render(
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
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
