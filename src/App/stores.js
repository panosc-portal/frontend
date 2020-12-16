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
