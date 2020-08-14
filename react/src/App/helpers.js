import {useState} from 'react'

import moment from 'moment'
import {useErrorHandler} from 'react-error-boundary'

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

export const useFetch = () => {
  const [error, setError] = useState()
  const [data, setData] = useState()
  useErrorHandler(error)
  const doFetch = async (uri, method, payload) => {
    const params = {
      method,
      credentials: 'include',
    }
    if (payload) {
      params.body = JSON.stringify(payload)
      params.headers = {
        'Content-Type': 'application/json',
      }
    }
    try {
      const call = await fetch(process.env.REACT_APP_CLOUD + uri, params)
      const data = await call.json()
      setData(data)
      if (!call.ok) {
        setError(call.status)
      }
    } catch (e) {
      setError(e)
    }
  }
  return [doFetch, data]
}
