/**
 * should satisfy any search api query (document, dataset, instrument)
 * supports objects of unlimited depth
 * could be way cleaner (applySpec, chain, transduce, ...)
 * could be more efficient
 *
 * feedback is very welcome, i'm very new to fp
 *
 * feel free to put log('your label') in any pipe
 **/

import {
  __,
  add,
  addIndex,
  always,
  assocPath,
  both,
  concat,
  converge,
  descend,
  equals,
  filter,
  flip,
  has,
  identity,
  ifElse,
  is,
  isEmpty,
  isNil,
  juxt,
  last,
  length,
  lensPath,
  lensProp,
  map,
  mergeDeepRight,
  objOf,
  over,
  pick,
  pipe,
  prop,
  propOr,
  reduce,
  reduceRight,
  reject,
  slice,
  sort,
  uniq,
  unnest,
  useWith,
  values,
  when,
} from 'ramda'

const log = (label) => (xs) => {
  console.log(label)
  console.log(xs)
  return xs
}

const makePathFromTarget = reduceRight(
  (val, acc) =>
    isEmpty(acc)
      ? {include: {[val]: {relation: val}}}
      : {include: {[val]: {relation: val, scope: acc}}},
  {},
)
const getPathFromTarget = addIndex(reduceRight)(
  (val, acc, idx, list) =>
    idx === list.length - 1
      ? ['include', val, ...acc]
      : ['scope', 'include', val, ...acc],
  ['scope', 'where'],
)

const makeNonParameter = converge(objOf, [
  propOr('name', 'name'),
  ifElse(
    has('operator'),
    converge(objOf, [prop('operator'), prop('value')]),
    prop('value'),
  ),
])

const makeParameter = pipe(
  juxt([
    pipe(prop('unit'), objOf('unit')),
    pick(['name']),
    ifElse(
      has('operator'),
      converge(objOf, [prop('operator'), prop('value')]),
      pick(['value']),
    ),
  ]),
  reject(both(has('unit'), pipe(prop('unit'), isNil))),
  objOf('and'),
)

const isParameter = pipe(prop('target'), last, equals('parameters'))

const makeObjectFromConfig = pipe(
  pick(['skip', 'limit', 'include']),
  when(
    has('include'),
    over(
      lensProp('include'),
      pipe(
        map(pipe(makePathFromTarget, prop('include'))),
        reduce(mergeDeepRight, {}),
      ),
    ),
  ),
)

const makeFilter = ifElse(
  isParameter,
  ifElse(
    has('filters'),
    converge(objOf, [
      prop('operator'),
      pipe(prop('filters'), map(makeParameter)),
    ]),
    makeParameter,
  ),
  ifElse(
    has('filters'),
    converge(objOf, [
      prop('operator'),
      pipe(prop('filters'), map(makeNonParameter)),
    ]),
    makeNonParameter,
  ),
)

const makeObjectFromFilters = pipe(
  map(
    ifElse(
      has('target'),
      converge(assocPath, [
        pipe(prop('target'), getPathFromTarget),
        makeFilter,
        pipe(prop('target'), makePathFromTarget),
      ]),
      pipe(makeNonParameter, objOf('where')),
    ),
  ),
  reduce(mergeDeepRight, {}),
)

const getPathsFromConfig = pipe(prop('include'), map(getPathFromTarget))

const getPathsFromFilters = pipe(
  filter(has('target')),
  map(pipe(prop('target'), getPathFromTarget)),
)

const makeUniqueSortedPathsToIncludeKeys = pipe(
  concat,
  map(
    pipe(
      addIndex(map)((item, idx, list) => {
        //fml
        return when(
          equals('include'),
          always(slice(0, add(1, idx), list)),
        )(item)
      }),
      filter(is(Array)),
    ),
  ),
  unnest,
  uniq,
  sort(descend(length)),
)

//useWith is interpreted as react hook, therefore the disables
//eslint-disable-next-line
const getPathsDueCleanup = useWith(makeUniqueSortedPathsToIncludeKeys, [
  getPathsFromConfig,
  getPathsFromFilters,
])

//looks more complicated than it should
//eslint-disable-next-line
const cleanup = flip(useWith(over(__, values, __), [lensPath, identity]))

//export default (config) => (filters) => ...
export default converge(
  pipe(
    reduce(cleanup),
    log('query from parser'),
    JSON.stringify,
    encodeURIComponent,
  ),
  [
    //eslint-disable-next-line
    useWith(mergeDeepRight, [makeObjectFromConfig, makeObjectFromFilters]),
    getPathsDueCleanup,
  ],
)
