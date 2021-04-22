import {identity, map, assoc, curry, pipe, nAry, dropLast} from 'ramda'
import create from 'zustand'

import filtersBase from '../Search/filtersBase'
import {initFilterState, actions} from '../Search/new'

export const useSearchNStore = create((set, get) => {
  const mapActionReducers = (action) => {
    const arity = nAry(action.length - 1)
    return arity(set(({state}) => action(state)))
  }
  return {
    reducers: map(mapActionReducers, actions),
    toggleIsActive: curry((target, id, e) =>
      set(({filters}) => ({
        filters: actions.toggleIsActive(target, id, e, filters),
      })),
    ),
    assign: curry((target, id, prop, e) =>
      set(({filters}) => ({
        filters: actions.assign(target, id, prop, e, filters),
      })),
    ),
    toggleValueInList: curry((target, id, e) =>
      set(({filters}) => ({
        filters: actions.toggleValueInList(target, id, e, filters),
      })),
    ),
    filters: (() => {
      const actions = {
        toggleValueInList: curry((target, id, e) =>
          get().toggleValueInList(target, id, e),
        ),
        toggleIsActive: curry((target, id, e) =>
          get().toggleIsActive(target, id, e),
        ),
        assign: curry((target, id, prop, e) =>
          get().assign(target, id, prop, e),
        ),
      }
      return initFilterState(actions, filtersBase)
    })(),
  }
})
