import {identity, map, assoc, curry, pipe, curryN, prop} from 'ramda'
import create from 'zustand'

import filtersBase from '../Search/filtersBase'
import {initFilterState, actions, toggleTargetOperator} from '../Search/new'

export const useSearchNStore = create((set, get) => {
  const {toggleValueInList, assign, toggleIsActive} = actions
  const wrap = (wrapper) => (action) => {
    const arity = curryN(action.length - 1)
    const ready = arity(wrapper(action))
    return ready
  }
  const wrapReducer = wrap(() => {})
  const toggleTarget = wrapReducer(toggleTargetOperator)
  console.log(toggleTarget.length)
  const actionsWithReducers = map(wrapReducer, actions)
  const initialFilters = initFilterState(
    actionsWithReducers,
    toggleTarget,
    filtersBase,
  )
  return {
    reducero: (reducerFn) => set((state) => reducerFn(state.filters)),
    filters: (() => {
      const test = get().reducero
      console.log(test)
      return initFilterState(actionsWithReducers, toggleTarget, filtersBase)
    })(),
  }
})
