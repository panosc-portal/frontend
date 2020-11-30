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

const useSearchQuery = create(set => ({
  query,
  page: 1,
  scrollIndex: 0,
  setScrollIndex: scrollIndex => set(() => ({scrollIndex})),
  setQuery: object => set(() => ({query: object})),
  setPage: page => set(() => ({page})),
  resetQuery: () => set(() => ({query})),
}))

export default useSearchQuery
