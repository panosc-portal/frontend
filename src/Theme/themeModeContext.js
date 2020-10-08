import React, {useState, useCallback, createContext} from 'react'

const ThemeModeContext = createContext()

export const ThemeModeProvider = props => {
  const preset =
    localStorage.getItem('isDark') === 'true' ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? true
      : false
  const [isDark, setIsDark] = useState(preset)
  const toggle = useCallback(
    () => setIsDark(!isDark) || localStorage.setItem('isDark', !isDark),
    [isDark]
  )
  return (
    <ThemeModeContext.Provider value={{isDark, toggle}}>
      {props.children}
    </ThemeModeContext.Provider>
  )
}

export default ThemeModeContext
