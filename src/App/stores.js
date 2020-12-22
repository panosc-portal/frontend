import create from 'zustand'

import breakpoints from '../Theme/breakpoints'

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
  desktopView: () => get().windowWidth > parseInt(breakpoints[1]) * 16,
}))

export const useNavigationStore = create(set => ({
  sections: [],
  setSections: arr => set(() => ({sections: arr})),
}))
