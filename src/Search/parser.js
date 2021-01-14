import * as R from 'ramda'

import {baseQueryWhere} from '../App/helpers'

/* todo
 * how to handle filter relationships?
 * worst case fallback to global inclusive/exclusive
 */

const parse = filters => {
  // const parsed = R.compose(encodeURIComponent, JSON.strigify)

  //how to cond
  const fn = R.cond([
    [R.equals(0), R.always('water freezes at 0°C')],
    [R.equals(100), R.always('water boils at 100°C')],
    [R.T, temp => 'nothing special happens at ' + temp + '°C'],
  ])
  fn(0) //=> 'water freezes at 0°C'

  //i know this still looks like crap btw
  const getSorted = R.compose(
    R.map(R.groupBy(R.prop('operator'))),
    R.groupBy(R.prop('target'))
  )
  const all = R.mapObjIndexed(getSorted)
  //should flatten by same operator
  const out = all(filters)
  return out
}

export default parse

export const base = baseQueryWhere

export const filters = {
  technique: [
    {
      value: ['Reflectometry', 'Scattering'],
      operator: 'inq',
    },
    {
      type: 'technique',
      value: ['Soft Diffraction', 'Diffraction Imaging'],
      operator: 'inq',
      target: undefined,
    },
    {
      type: 'technique',
      value: ['Spectroscopy'],
      operator: 'exq',
      target: undefined,
    },
    {
      value: ['Reflectometry', 'Scattering'],
      operator: 'inq',
      target: 'datasets',
    },
  ],
  text: [
    {
      type: 'title',
      value: 'recoil',
      operator: 'ilike',
      target: undefined,
    },
  ],
}
