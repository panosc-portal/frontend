import React, {useState} from 'react'

export const ThemeContext = React.createContext()

const ThemeProvider = (props) => {
  localStorage.getItem('darkTheme') === null &&
    localStorage.setItem('darkTheme', true)
  let isDark
  localStorage.getItem('darkTheme') === 'true'
    ? (isDark = true)
    : (isDark = false)
  const [darkTheme, setDarkTheme] = useState(isDark)
  const changeTheme = () => {
    localStorage.setItem('darkTheme', !darkTheme)
    return setDarkTheme(!darkTheme)
  }

  return (
    <ThemeContext.Provider value={{darkTheme, setDarkTheme, changeTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
