import * as R from 'ramda'

import {baseQueryWhere} from '../App/helpers'

/* todo
 * how to handle filter relationships?
 * worst case fallback to global inclusive/exclusive
 */

const fazeFiltru = {
  name: 'documents',
  where: {type: 'proposal'},
  include: [{relation: 'datasets'}],
}

export const filters = [
  {
    name: 'photon_energy',
    value: [880, 990],
    unit: 'eV',
    target: ['datsets', 'parameters'],
    valueOperator: 'between',
  },
]
const getSearchString = (filter, obj) => {
  const wherePath = ['include', 'scope', 'where', 'filter.name']
  const relationPath = ['include', 'relation']
  const value = filter.value
  console.log(obj)
  const assocRelation = (filter, obj) => {
    return R.assocPath(['include', 'relation'], filter.target, obj)
  }
  const relationed = assocRelation(filter, obj)
  const include = R.find(R.propEq('relation', filter.target))(obj.include)
  console.log(include)

  const where = R.assocPath(
    ['scope', 'where', filter.name],
    filter.value
  )(include)
  console.log(where)
}

export default getSearchString
