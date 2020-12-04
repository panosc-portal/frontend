import css from '@styled-system/css'
import normalize from 'normalize.css'
import {createGlobalStyle} from 'styled-components'
const GlobalStyle = createGlobalStyle(
  css({
    normalize,
    body: {
      backgroundColor: 'background',
      color: 'text',
      fontSize: [0, 1, 1, 2, 2],
      height: '100%',
      fontFamily: 'body',
    },
    html: {
      height: '100%',
      fontSize: '10px',
    },
    '#root': {
      height: '100%',
    },
  })
)
export default GlobalStyle
