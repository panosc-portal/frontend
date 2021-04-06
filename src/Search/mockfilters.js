const filters = [
  {
    target: ['datasets', 'parameters'],
    operator: 'and',
    filters: [
      {
        name: 'wavelength',
        value: [700, 900],
        operator: 'between',
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
  // {
  //   target: ['datasets', 'parameters'],
  //   name: 'wavelength',
  //   value: 700,
  //   unit: 'nm',
  // },
  {target: ['datasets', 'techniques'], value: 'x-ray absorption'},
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
  {name: 'type', value: 'proposal'},
]

export default filters

export const config = {
  skip: 10,
  limit: 10,
  include: [
    ['members', 'person', 'info'],
    ['datasets', 'parameters'],
    ['datasets', 'samples'],
  ],
}
