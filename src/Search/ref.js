import {
  evolve,
  set,
  isNil,
  either,
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
  curryN,
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

const lens = (target, id) => lensPath([target, 'filters', id])

const toggleIsActive = (target, id, e) => {
  console.log(target)
  return over(lens(target, id), evolve({isActive: not}))
}

const assign = (target, id, prop, e) => {
  return over(lens(target, id), assoc(prop, e))
}

const toggleValueInList = (target, id, e) => {
  const toggleValue = (e) => (list) =>
    ifElse(includes(e), reject(equals(e)), append(e))(list)
  return over(lens(target, id), evolve({value: toggleValue(e)}))
}
const toggleTargetOperator = (target, e) => {
  const toggle = ifElse(equals('AND'), always('OR'), always('AND'))
  return over(lensPath([target, 'operator']), toggle)
}

const wrap = (set) => (action) =>
  curryN(prop('length', action), pipe(action, set))

export const actions = {
  toggleIsActive,
  assign,
  toggleValueInList,
}

const log = (label) => (xs) => {
  console.log(label)
  console.log(xs)
  return xs
}

export const parseToExternal = (filters) =>
  map(over(lensProp('filters'), values))(filters)

export const initFilterState = (filters) => {
  return pipe(
    groupBy(prop('target')),
    map(
      pipe(
        objOf('filters'),
        converge(assoc('target'), [
          view(lensPath(['filters', 0, 'target'])),
          identity,
        ]),
        over(
          lensProp('filters'),
          map(
            pipe(
              omit(['target']),
              assoc('isActive', false),
              addIndex(map)(flip(assoc('idx'))),
            ),
          ),
        ),
        ifElse(
          pipe(prop('target'), either(isNil, equals('undefined'))),
          assoc('target', 'root'),
          pipe(assoc('operator', 'AND')),
        ),
      ),
    ),
  )(filters)
}

export const initActions = (actions, setter) =>
  ifElse(isNil(setter), pipe(identity), pipe(map(setter)))(actions)

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
