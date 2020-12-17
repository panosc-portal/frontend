import create from 'zustand'

const query = {
  include: [
    {
      relation: 'datasets',
    },
    {
      relation: 'members',
      scope: {
        include: [
          {
            relation: 'affiliation',
          },
          {
            relation: 'person',
          },
        ],
      },
    },
  ],
}

export const useDocumentsStore = create(set => ({
  page: 1,
  setPage: page => set(() => ({page})),
  scrollPosition: 0,
  setScrollPosition: scrollPosition => set(() => ({scrollPosition})),
}))

export const useSearchStore = create(set => ({
  query,
  setQuery: object => set(() => ({query: object})),
  resetQuery: () => set(() => ({query})),
}))

const preset =
  localStorage.getItem('isDark') === 'true' ||
  (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? true
    : false

export const useThemeStore = create((set, get) => ({
  isDark: preset,
  toggleTheme: () => {
    const newTheme = !get().isDark
    localStorage.setItem('isDark', newTheme)
    set(() => ({isDark: newTheme}))
  },
}))
