import React from 'react'
import {ThemeProvider} from 'emotion-theming'
import theme from '@rebass/preset'

const ThemeWrap = (props) => (
  <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
)

export default ThemeWrap
