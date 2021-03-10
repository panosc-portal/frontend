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

  console.log(`plain:`)
  console.log(plainQuery)

  const normalizedFilters = R.map(
    R.pipe(
      R.pick(['target', 'operator', 'value', 'name', 'unit', 'filters']),
      R.evolve({
        filters: R.map(R.pick(['operator', 'value', 'name', 'unit'])),
      })
    )
  )(filters)

  const filtersWithTarget = R.filter(R.has('target'), normalizedFilters)
  const filtersWithoutTarget = R.reject(R.has('target'), normalizedFilters)

  const assocNonParameterFilter = filter => ({
    [filter.name ?? 'name']: filter?.operator
      ? {[filter.operator]: filter?.value}
      : filter?.value,
  })

  const assocParameterFilter = filter => {
    const arr = [
      R.objOf('name', R.prop('name', filter)),
      R.objOf(
        'value',
        R.ifElse(
          R.has('operator'),
          R.converge(R.objOf, [R.prop('operator'), R.prop('value')]),
          R.prop('value')
        )(filter)
      ),
    ]
    return filter.unit ? {and: [...arr, {unit: filter.unit}]} : {and: arr}
  }

  const handleParamNonParam = filter =>
    filter?.target[filter.target.length - 1] === 'parameters'
      ? assocParameterFilter(filter)
      : assocNonParameterFilter(filter)

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

  const queryWithPathsForFilters = R.pipe(
    R.map(R.pipe(R.prop('target'), createPathFromTarget)),
    R.reduce(R.mergeDeepLeft, {}),
    R.mergeDeepRight(plainQuery)
    //broken by design
    // R.assoc('where', R.map(makeNonParameter, whereFilters))
  )(filtersWithTarget)

  const targetToPath = R.addIndex(R.reduceRight)(
    (val, acc, idx, list) =>
      idx === list.length - 1
        ? ['include', val, ...acc]
        : ['scope', 'include', val, ...acc],
    []
  )

  const assocFilterValues = R.reduce(
    (acc, val) =>
      R.over(
        R.lensPath(targetToPath(R.prop('target', val))),
        R.mergeRight(R.objOf('scope', {where: handleSingleOrMany(val)})),
        acc
      ),
    queryWithPathsForFilters
  )

  const full = assocFilterValues(filtersWithTarget)
  console.log(full)

  //this is broken by design, need rewrite
  const getAllIncludePaths = R.map(
    R.pipe(R.prop('target'), targetToPath, R.dropLast(1))
  )(filtersWithTarget)
  const includeLens = R.lensPath(['include'])
  const makeIncludesArrays = R.reduce(
    (acc, val) => R.over(R.lensPath(val), R.values, acc),
    full
  )
  const getPathsForDefaultIncludes = R.map(R.pipe(targetToPath, R.dropLast(1)))(
    R.prop('include', config)
  )
  // const getPaths = R.converge(R.concat, [
  //   R.map(R.pipe(R.prop('target'), targetToPath, R.dropLast(1)))(
  //     filtersWithTarget
  //   ),
  //   R.map(R.pipe(targetToPath, R.dropLast(1)))(R.prop('include', config)),
  // ])
  // console.log(getPaths)
  const paths = R.concat(getAllIncludePaths, getPathsForDefaultIncludes)
  const final = R.over(includeLens, R.values)(makeIncludesArrays(paths))
  return R.pipe(JSON.stringify, encodeURIComponent)(final)
})

export default parser

export const filters = [
  // {
  //   target: ['datasets', 'parameters'],
  //   operator: 'or',
  //   filters: [
  //     {
  //       name: 'wavelength',
  //       value: [700, 900],
  //       operator: 'between',
  //       unit: 'nm',
  //     },
  //     {
  //       name: 'photon_energy',
  //       value: [800, 900],
  //       operator: 'between',
  //       unit: 'eV',
  //       excess: 'isExcess',
  //     },
  //   ],
  // },
  {
    target: ['datasets', 'parameters'],
    name: 'wavelength',
    value: [700, 900],
    operator: 'between',
    unit: 'nm',
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
