import {
  addIndex,
  reject,
  filter,
  concat,
  slice,
  is,
  identity,
  always,
  map,
  reduce,
  reduceRight,
  mergeDeepRight,
  pick,
  lensProp,
  sort,
  descend,
  length,
  flip,
  values,
  uniq,
  unnest,
  pipe,
  __,
  prop,
  equals,
  over,
  lensPath,
  assocPath,
  objOf,
  of,
  ap,
  useWith as uuseWith,
  converge,
  both,
  has,
  ifElse,
  when,
  last,
  add,
  isNil,
  isEmpty,
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

const makeNonParameter = (filter) => ({
  [filter.name ?? 'name']: filter?.operator
    ? {[filter.operator]: filter?.value}
    : filter?.value,
})

const makeParameter = pipe(
  of,
  ap([
    pipe(prop('unit'), objOf('unit')),
    pipe(prop('name'), objOf('name')),
    ifElse(
      has('operator'),
      converge(objOf, [prop('operator'), prop('value')]),
      pick('value'),
    ),
  ]),
  reject(both(has('unit'), pipe(prop('unit'), isNil))),
  objOf('and'),
)

const isParameter = pipe(prop('target'), last, equals('parameters'))

const makeConfig = pipe(
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
const makeFilter = pipe(
  ifElse(
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
  ),
)

const makeFilters = pipe(
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
)

const mapIndexed = addIndex(map)

const getPathsDueCleanup = uuseWith(
  pipe(
    concat,
    map(
      pipe(
        mapIndexed((item, idx, list) => {
          return when(
            equals('include'),
            always(slice(0, add(1, idx), list)),
          )(item)
        }),
        reject(is(String)),
      ),
    ),
    unnest,
    uniq,
    sort(descend(length)),
  ),
  [
    pipe(prop('include'), map(getPathFromTarget)),
    pipe(filter(has('target')), map(pipe(prop('target'), getPathFromTarget))),
  ],
)
const cleanup = flip(uuseWith(over(__, values, __), [lensPath, identity]))

export default converge(
  pipe(reduce(cleanup), log('query'), JSON.stringify, encodeURIComponent),
  [
    uuseWith(reduce(mergeDeepRight), [makeConfig, makeFilters]),
    getPathsDueCleanup,
  ],
)
