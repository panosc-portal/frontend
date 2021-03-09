//refactor needed af!

import * as R from 'ramda'

const parser = R.curry((config, filters) => {
  const log = xs => {
    console.log(xs)
    return xs
  }
  const createPathFromTarget = R.reduceRight(
    (val, acc) =>
      R.isEmpty(acc)
        ? {include: {[val]: {relation: val}}}
        : {include: {[val]: {relation: val, scope: acc}}},
    {}
  )

  const plainQuery = R.pipe(
    R.pick(['skip', 'limit', 'include']),
    R.when(
      R.has('include'),
      R.over(
        R.lensProp('include'),
        R.pipe(
          R.map(R.pipe(createPathFromTarget, R.prop('include'))),
          R.reduce(R.mergeDeepLeft, {})
        )
      )
    )
  )(config)

  const normalizedFilters = R.map(
    R.pipe(
      R.pick(['target', 'operator', 'value', 'name', 'unit', 'filters']),
      R.evolve({
        filters: R.map(R.pick(['operator', 'value', 'name', 'unit'])),
      })
    )
  )(filters)

  const includeFilters = R.filter(R.has('target'), normalizedFilters)
  const whereFilters = R.reject(R.has('target'), normalizedFilters)

  const makeNonParameter = filter => ({
    [filter.name ?? 'name']: filter?.operator
      ? {[filter.operator]: filter?.value}
      : filter?.value,
  })
  const handleParamNonParam = filter =>
    filter?.target[filter.target.length - 1] === 'parameters'
      ? makeParameter(filter)
      : makeNonParameter(filter)

  //remove the assoc target by altering fn composition
  const handleMany = filter => {
    const many = R.map(
      R.pipe(R.assoc('target', filter.target), handleParamNonParam)
    )(R.prop('filters', filter))
    return {[filter.operator]: many}
  }
  const handleSingleOrMany = R.ifElse(
    R.has('filters'),
    handleMany,
    handleParamNonParam
  )
  const skeleton = R.pipe(
    R.map(R.pipe(R.prop('target'), createPathFromTarget)),
    R.reduce(R.mergeDeepLeft, {}),
    R.mergeDeepRight(plainQuery),
    //broken by design
    R.assoc('where', R.map(makeNonParameter, whereFilters))
  )(includeFilters)

  const targetToPath = R.addIndex(R.reduceRight)(
    (val, acc, idx, list) =>
      idx === list.length - 1
        ? ['include', val, ...acc]
        : ['scope', 'include', val, ...acc],
    []
  )

  const makeParameter = filter => {
    const arr = [
      {name: filter?.name},
      {
        value: R.has('operator', filter)
          ? {[filter.operator]: filter.value}
          : filter.value,
      },
    ]
    return filter.unit ? {and: [...arr, {unit: filter.unit}]} : {and: arr}
  }

  const assocFilterValues = R.reduce((acc, val) => {
    const path = targetToPath(val?.target)
    const lens = R.lensPath(path)
    return R.over(
      lens,
      R.mergeRight(R.objOf('scope', {where: handleSingleOrMany(val)})),
      acc
    )
  }, skeleton)

  const full = assocFilterValues(includeFilters)

  //this is broken by design, need rewrite
  const getAllIncludePaths = R.map(
    R.pipe(R.prop('target'), targetToPath, R.dropLast(1))
  )(includeFilters)
  const includeLens = R.lensPath(['include'])
  const makeIncludesArrays = R.reduce(
    (acc, val) => R.over(R.lensPath(val), R.values, acc),
    full
  )
  const final = R.over(
    includeLens,
    R.values
  )(makeIncludesArrays(getAllIncludePaths))
  console.log(final)
  return R.pipe(JSON.stringify, encodeURIComponent)(final)
})

export default parser

export const filters = [
  {
    target: ['datasets', 'parameters'],
    operator: 'or',
    filters: [
      {
        name: 'wavelength',
        value: [700, 900],
        operator: 'between',
        unit: 'nm',
      },
      {
        name: 'photon_energy',
        value: [800, 900],
        operator: 'between',
        unit: 'eV',
        excess: 'isExcess',
      },
    ],
  },
  // {target: ['datasets', 'techniques'], value: 'x-ray absorption'},
  {
    target: ['datasets', 'techniques'],
    operator: 'and',
    filters: [{value: 'x-ray absorption'}, {value: 'whatever'}],
  },
  {
    target: ['members', 'person'],
    value: 'Bob',
    name: 'fullName',
    excess: 'isExcess',
  },
  {name: 'title', value: 'recoil', operator: 'ilike'},
]

export const config = {
  skip: 10,
  limit: 10,
  include: [
    ['members', 'person'],
    ['datasets', 'parameters'],
    ['datasets', 'samples'],
  ],
}
