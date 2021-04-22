import {nanoid} from 'nanoid'
import {
  evolve,
  isNil,
  __,
  has,
  propEq,
  unless,
  curry,
  over,
  pipe,
  lensIndex,
  ifElse,
  includes,
  append,
  equals,
  reject,
  assoc,
  not,
  map,
  groupBy,
  prop,
  length,
  lt,
  when,
  objOf,
  mapObjIndexed,
  flip,
  view,
  lensPath,
  converge,
  reduce,
  identity,
  lensProp,
  mergeRight,
  addIndex,
  always,
  T,
  head,
  values,
  F,
  cond,
  forEach,
  filter,
  applyTo,
  gt,
  mergeDeepRight,
  omit,
} from 'ramda'

import filtersBase from './filtersBase'

const lens = (target, id) => lensPath([target, 'filters', id])

const toggleIsActive = curry((target, id, e, state) =>
  over(lens(target, id), evolve({isActive: not}), state),
)

const assign = (target, id, prop, e, state) => {
  console.log('assign')
  console.log(target)
  console.log(id)
  console.log(prop)
  console.log(state)
  return over(lens(target, id), assoc(prop, e), state)
}

const toggleValueInList = curry((target, id, e, state) => {
  const toggleValue = (e) => (list) =>
    ifElse(includes(e), reject(equals(e)), append(e))(list)
  return over(lens(target, id), evolve({value: toggleValue(e)}), state)
})
export const toggleTargetOperator = curry((target, e, state) => {
  const toggle = ifElse(equals('AND'), 'OR', 'AND')
  return over(lensProp(target), toggle, state)
})

export const actions = {toggleIsActive, assign, toggleValueInList}
const log = (label) => (xs) => {
  console.log(label)
  console.log(xs)
  return xs
}
export const parseToExternal = (filters) =>
  map(over(lensProp('filters'), values))(filters)

export const initFilterState = (actions, toggleTarget, filters) => {
  return pipe(
    map((filter) =>
      pipe(
        mergeRight(objOf('actions', actions)),
        over(
          lensProp('actions'),
          pipe(
            map(
              pipe(
                applyTo(prop('target', filter)),
                applyTo(prop('id', filter)),
              ),
            ),
            converge(assoc('updateValue'), [
              pipe(prop('assign'), applyTo('value')),
              identity,
            ]),
            converge(assoc('updateOperator'), [
              pipe(prop('assign'), applyTo('operator')),
              identity,
            ]),
            converge(assoc('updateUnit'), [
              pipe(prop('assign'), applyTo('unit')),
              identity,
            ]),
          ),
        ),
      )(filter),
    ),
    groupBy(prop('target')),
    map(objOf('filters')),
    map(
      pipe(
        converge(assoc('target'), [
          view(lensPath(['filters', 0, 'target'])),
          identity,
        ]),
        over(
          lensProp('filters'),
          pipe(
            map(
              pipe(
                omit(['target']),
                assoc('isActive', false),
                converge(objOf, [prop('id'), identity]),
              ),
            ),
            reduce(mergeRight, {}),
          ),
        ),
        unless(
          pipe(prop('target'), isNil),
          converge(assoc('toggleOperator'), [
            pipe(prop('target'), applyTo, toggleTarget),
            identity,
          ]),
        ),
      ),
    ),
  )(filters)
}

export const generatorFilter = (filterState) =>
  pipe(
    map(over(lensProp('filters'), pipe(values, filter(prop('isActive'))))),
    map(
      cond([
        [pipe(prop('filters'), length, gt(1)), always({})],
        [pipe(prop('filters'), length, gt(2)), pipe(prop('filters'), head)],
        [T, unless(has('operator'), assoc('operator', 'and'))],
      ]),
    ),
    values,
  )(filterState)
const assignActionsToFilters = curry((actions, filterState) => {
  const {
    toggleTargetOperator,
    toggleValueInList,
    toggleIsActive,
    assign,
  } = actions
  const withOpToggle = filterState.map((target) => ({
    ...target,
    toggleOperator: toggleTargetOperator(target),
  }))

  const withFilterActions = withOpToggle.map((target) =>
    target.filters.map((filter) => ({
      ...filter,
      updateValue: assign(target, filter.id, 'value'),
    })),
  )
  return withFilterActions
})
