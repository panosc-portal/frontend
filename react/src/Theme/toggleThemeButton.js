import React, {useContext} from 'react'

import {Link} from 'rebass/styled-components'

import ThemeModeContext from './themeModeContext'

const ToggleThemeButton = () => {
  const {toggle, isDark} = useContext(ThemeModeContext)
  return (
    <Link variant="nav" onClick={() => toggle()}>
      {isDark ? 'Lighten' : 'Darken'}
    </Link>
  )
}
export default ToggleThemeButton
