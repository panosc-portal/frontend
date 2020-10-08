import moment from 'moment'

export const momented = date => moment(date).format('L')

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

export const parseObjectToUri = object =>
  encodeURIComponent(JSON.stringify(object))
