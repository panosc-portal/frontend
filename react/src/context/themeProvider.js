import React, {useState} from 'react'
import {ThemeProvider} from 'emotion-theming'
import lightTheme from '../theme/lightTheme'
import darkTheme from '../theme/darkTheme'

const ThemeWrap = (props) => {
  const [isLight, setIsLight] = useState(false)
  window.matchMedia('(prefers-color-scheme: light)').matches ||
    (localStorage.getItem('isLight') && setIsLight(true))
  return <ThemeProvider theme={darkTheme}>{props.children}</ThemeProvider>
}

export default ThemeWrap
