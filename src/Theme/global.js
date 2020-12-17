import css from '@styled-system/css'
import normalize from 'normalize.css'
import {createGlobalStyle} from 'styled-components'
const GlobalStyle = createGlobalStyle(
  css({
    normalize,
    body: {
      backgroundColor: 'background',
      color: 'text',
      fontFamily: 'body',
      fontSize: [0, 0, 1],
    },
  })
)
export default GlobalStyle
