import {nanoid} from 'nanoid'
import {addIndex, map, flip, assoc} from 'ramda'
const filters = [
  {target: ['techniques'], value: 'technique 1'},
  {
    target: ['parameters'],
    kind: 'numeric',
    name: 'wavelength',
    minMax: [200, 1100],
    units: ['nM'],
  },
  {
    target: ['parameters'],
    kind: 'numeric',
    name: 'photon_energy',
    minMax: [0, 1000],
    units: ['eV'],
  },
  {
    target: ['parameters'],
    kind: 'plain',
    name: 'chemical_formula',
  },
  {
    target: ['parameters'],
    kind: 'list',
    name: 'wasSomething',
    values: ['On', 'Off', 'Green', 'Purified', 'Working'],
  },
  {name: 'type', kind: 'list', values: ['proposal', 'experiment']},
  {name: 'title'},
  {
    kind: 'list',
    name: 'keywords',
    operators: ['inq', 'exq'],
    values: ['fresh', 'science dog', 'plasma', 'anti-matter', 'earth is flat'],
  },
]
const mockIds = map((f) => ({...f, id: nanoid()}))
const apiLike = mockIds(filters)
export default apiLike
