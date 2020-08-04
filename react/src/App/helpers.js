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

//please flag or rewrite if it's too niche, contains Dan Abramov's pro hacks though!
export const doPost = async (uri, setErr, payload) => {
  const params = {
    method: 'post',
  }
  if (payload) {
    params.body = JSON.stringify(payload)
    params.headers = {
      'Content-Type': 'application/json',
    }
  }
  try {
    const call = await fetch(process.env.REACT_APP_CLOUD + uri, params)
    //all responses are valid in fetch, therefore catching !call.ok to take care of "not okay" responses
    !call.ok &&
      setErr(() => {
        throw call.data
      })
  } catch (e) {
    //not sure if it's the best approach but allows usage of a unified error boundary
    //https://github.com/facebook/react/issues/14981#issuecomment-468460187
    //keeping state inside the component so that the lowest boundary is available
    setErr(() => {
      throw e
    })
  }
}

export const doDelete = async (uri, setErr) => {
  const params = {
    method: 'delete',
  }
  try {
    const call = await fetch(process.env.REACT_APP_CLOUD + uri, params)
    !call.ok &&
      setErr(() => {
        throw call.data
      })
  } catch (e) {
    setErr(() => {
      throw e
    })
  }
}
