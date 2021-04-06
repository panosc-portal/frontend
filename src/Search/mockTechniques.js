import {objOf, map} from 'ramda'

const filters = {
  techniques: map(objOf('value'))([
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
    'small-angle neutron scattering',
    'x-ray absorption',
  ]),

  parameters: [
    {
      name: 'wavelength',
      type: 'range',
      defaultUnit: 'nm',
      minValue: 100,
      maxValue: 1200,
    },
    {
      name: 'photon_energy',
      type: 'range',
      defaultUnit: 'eV',
      minValue: 100,
      maxValue: 1200,
    },
    {name: 'chemical_formula', type: 'text'},
    {name: 'wasSomethingOn', type: 'bool'},
  ],
}

export default filters
