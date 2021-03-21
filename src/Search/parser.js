import * as R from 'ramda'

const makePathFromTarget = R.reduceRight(
  (val, acc) =>
    R.isEmpty(acc)
      ? {include: {[val]: {relation: val}}}
      : {include: {[val]: {relation: val, scope: acc}}},
  {},
)
const getPathFromTarget = R.addIndex(R.reduceRight)(
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

const makeParameter = R.pipe(
  R.of,
  R.ap([
    R.pipe(R.prop('unit'), R.objOf('unit')),
    R.pipe(R.prop('name'), R.objOf('name')),
    //objOfParameter = useWith(pipe, [prop, objOf])
    R.ifElse(
      R.has('operator'),
      R.converge(R.objOf, [R.prop('operator'), R.prop('value')]),
      R.pick('value'),
    ),
  ]),
  R.reject(R.both(R.has('unit'), R.pipe(R.prop('unit'), R.isNil))),
)

const isParameter = R.pipe(R.prop('target'), R.last, R.equals('parameters'))

const makeConfig = R.pipe(
  R.pick(['skip', 'limit', 'include']),
  R.when(
    R.has('include'),
    R.over(
      R.lensProp('include'),
      R.pipe(
        R.map(R.pipe(makePathFromTarget, R.prop('include'))),
        R.reduce(R.mergeDeepRight, {}),
      ),
    ),
  ),
)
const makeFilter = R.pipe(
  R.ifElse(
    isParameter,
    R.ifElse(
      R.has('filters'),
      R.converge(R.objOf, [
        R.prop('operator'),
        R.pipe(R.prop('filters'), R.map(makeParameter)),
      ]),
      makeParameter,
    ),
    R.ifElse(
      R.has('filters'),
      R.converge(R.objOf, [
        R.prop('operator'),
        R.pipe(R.prop('filters'), R.map(makeNonParameter)),
      ]),
      makeNonParameter,
    ),
  ),
)

const makeFilters = R.pipe(
  R.map(
    R.ifElse(
      R.has('target'),
      R.converge(R.assocPath, [
        R.pipe(R.prop('target'), getPathFromTarget),
        makeFilter,
        R.pipe(R.prop('target'), makePathFromTarget),
      ]),
      R.pipe(makeNonParameter, R.objOf('where')),
    ),
  ),
)

const mapIndexed = R.addIndex(R.map)

const getPathsDueCleanup = R.useWith(
  R.pipe(
    R.concat,
    R.map(
      R.pipe(
        mapIndexed((item, idx, list) => {
          return R.when(
            R.equals('include'),
            R.always(R.slice(0, R.add(1, idx), list)),
          )(item)
        }),
        R.reject(R.is(String)),
      ),
    ),
    R.unnest,
    R.uniq,
    R.sort(R.descend(R.length)),
  ),
  [
    R.pipe(R.prop('include'), R.map(getPathFromTarget)),
    R.pipe(
      R.filter(R.has('target')),
      R.map(R.pipe(R.prop('target'), getPathFromTarget)),
    ),
  ],
)
const cleanup = R.flip(
  R.useWith(R.over(R.__, R.values, R.__), [R.lensPath, R.identity]),
)

export default R.converge(
  R.pipe(R.reduce(cleanup), JSON.stringify, encodeURIComponent),
  [
    R.useWith(R.reduce(R.mergeDeepRight), [makeConfig, makeFilters]),
    getPathsDueCleanup,
  ],
)
