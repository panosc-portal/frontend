import React from 'react'

import {Global} from '@emotion/core'
import css from '@styled-system/css'
import normalize from 'normalize.css'
const GlobalStyle = () => (
  <Global
    styles={css({
      normalize,
      body: {
        backgroundColor: 'background',
        color: 'text',
        fontSize: [1],
        height: '100%',
        fontFamily: 'body',
      },
      html: {
        height: '100%',
      },
      '#root': {
        height: '100%',
      },
    })}
  />
)
export default GlobalStyle
