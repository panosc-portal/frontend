import {useAppStore} from '../App/stores'

const ToggleThemeButton = () => {
  const [isDark, toggleTheme] = useAppStore((state) => [
    state.isDark,
    state.toggleTheme,
  ])
  return {onClick: () => toggleTheme(), name: isDark ? 'Lighten' : 'Darken'}
}
export default ToggleThemeButton
