import React, {useContext} from 'react'
import {ThemeContext} from '../context/ThemeContext'
import {FiMoon, FiSun} from 'react-icons/fi'

const ThemeSwitcher = ({className}) => {
  const {darkTheme, changeTheme} = useContext(ThemeContext)
  return (
    <div
      className={className}
      onClick={() => changeTheme()}
      style={{cursor: 'pointer'}}
    >
      {darkTheme ? <FiSun /> : <FiMoon />}
    </div>
  )
}
export default ThemeSwitcher
