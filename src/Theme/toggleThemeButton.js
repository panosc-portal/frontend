import React from 'react'

import {useAppStore} from '../App/stores'
import {Button} from '../Primitives'

const ToggleThemeButton = () => {
  const [isDark, toggleTheme] = useAppStore(state => [
    state.isDark,
    state.toggleTheme,
  ])
  return (
    <Button variant="nav" onClick={() => toggleTheme()}>
      {isDark ? 'Lighten' : 'Darken'}
    </Button>
  )
}
export default ToggleThemeButton
