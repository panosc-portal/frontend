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
  scrollIndex: 0,
  setScrollIndex: scrollIndex => set(() => ({scrollIndex})),
  setPage: page => set(() => ({page})),
}))

export const useSearchStore = create(set => ({
  query,
  setQuery: object => set(() => ({query: object})),
  resetQuery: () => set(() => ({query})),
}))
