import {useState, useCallback} from 'react'

const useDark = () => {
  const preset =
    localStorage.getItem('isDark') === 'true' ||
    (window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? true
      : false
  console.log(preset)
  const [isDark, setIsDark] = useState(preset)
  const toggle = useCallback(
    () => setIsDark(!isDark) || localStorage.setItem('isDark', !isDark),
    [isDark]
  )
  return {isDark, toggle}
}

export default useDark
