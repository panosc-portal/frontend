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

const preset =
  localStorage.getItem('isDark') === 'true' ||
  (window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? true
    : false

export const useDocumentsStore = create(set => ({
  page: 1,
  setPage: int => set(() => ({page: int})),
  scrollPosition: 0,
  setScrollPosition: scrollPosition => set(() => ({scrollPosition})),
}))

export const useSearchStore = create(set => ({
  query,
  setQuery: obj => set(() => ({query: obj})),
  resetQuery: () => set(() => ({query})),
  buttons: [],
  setButtons: arr => set(() => ({buttons: arr})),
}))

export const useAppStore = create((set, get) => ({
  isDark: preset,
  toggleTheme: () => {
    const newTheme = !get().isDark
    localStorage.setItem('isDark', newTheme)
    set(() => ({isDark: newTheme}))
  },
  windowWidth: false,
  setWindowWidth: n => set(() => ({windowWidth: n})),
  //should be determined from above once i learn how to middleware
  isDesktop: true,
  setIsDesktop: bool => set(() => ({isDesktop: bool})),
}))

export const useNavigationStore = create(set => ({
  sections: [],
  setSections: arr => set(() => ({sections: arr})),
}))
