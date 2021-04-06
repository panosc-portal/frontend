import moment from 'moment'

export const parseDate = (date) => moment(date).format('L')

export const mockTechniques = [
  'Reflectometry',
  'Spectroscopy',
  'Phase Contrast Imaging',
  'Soft diffraction',
  'Scattering',
  'UV VUV spectroscopy',
  'Photoemission microscopy',
  'Polarised reflectivity',
  'Microfluorescence',
  'Gamma spectroscopy',
  'Three-axis spectrometers',
  'X-ray excited optical luminescence',
  'Diffraction Imaging',
]

export const baseQuery = {
  include: [
    {
      relation: 'datasets',
    },
    {
      relation: 'members',
      scope: {
        include: [
          {
            relation: 'affiliation',
          },
          {
            relation: 'person',
          },
        ],
      },
    },
  ],
}

export const baseQueryWhere = {
  include: [
    {
      relation: 'datasets',
    },
    {
      relation: 'members',
      scope: {
        include: [
          {
            relation: 'affiliation',
          },
          {
            relation: 'person',
          },
        ],
      },
    },
  ],
  where: {keywords: {inq: []}, title: {ilike: ''}},
}

export const parseObjectToUri = (object) =>
  encodeURIComponent(JSON.stringify(object))

export const documentSize = (datasets) => {
  const sum = datasets
    .map((item) => item.size)
    .reduce((acc, val) => acc + val, 0)
  return `${sum} MB`
}
