import * as serviceWorker from './serviceWorker'
import App from './App/app'
import React from 'react'
import ReactDOM from 'react-dom'

import {BrowserRouter} from 'react-router-dom'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import SWRProvider from './App/swrConfigProvider'

import normalize from 'normalize.css'
import theme from './App/theme'

const GlobalStyle = createGlobalStyle`
  ${normalize}
`
//Enable concurrent ui mode
ReactDOM.unstable_createRoot(document.getElementById('root')).render(
  <SWRProvider>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </SWRProvider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
