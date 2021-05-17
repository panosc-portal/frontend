import create from 'zustand'

import filtersBase from '../Search/filtersBase'
import {initFilterState, actions, toggleTargetOperator} from '../Search/new'

export const useSearchNStore = create((set) =>
  initFilterState(set, filtersBase),
)
