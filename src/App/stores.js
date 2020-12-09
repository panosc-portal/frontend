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
  restoredScroll: false,
  setRestoredScroll: bool => set(() => ({bool})),
  setPage: page => set(() => ({page})),
}))

export const useSearchStore = create(set => ({
  query,
  setQuery: object => set(() => ({query: object})),
  resetQuery: () => set(() => ({query})),
}))

export const useDatasetStore = create(set => ({
  datasets: null,
  setDatasets: data => set(() => ({data})),
}))
