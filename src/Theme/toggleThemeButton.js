import React from 'react'

import {useThemeStore} from '../App/stores'
import {Link} from '../Primitives'

const ToggleThemeButton = () => {
  const [isDark, toggleTheme] = useThemeStore(state => [
    state.isDark,
    state.toggleTheme,
  ])
  return (
    <Link variant="nav" onClick={() => toggleTheme()}>
      {isDark ? 'Lighten' : 'Darken'}
    </Link>
  )
}
export default ToggleThemeButton
