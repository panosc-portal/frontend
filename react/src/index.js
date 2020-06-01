import 'react-app-polyfill/stable'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter} from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import TabProvider from './context/TabContext'
import UserProvider from './context/UserContext'

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider>
        <TabProvider>
          <App />
        </TabProvider>
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
