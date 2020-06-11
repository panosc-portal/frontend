import React, {useState} from 'react'
import ReactSlider from 'react-slider'
import styled from 'styled-components'
import {useForm, Controller} from 'react-hook-form'
import {Div} from './Commons.js'
import {DevTool} from 'react-hook-form-devtools'
const listOfTechniques = [
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
  'Diffraction Imaging'
]

const SearchQuery = ({setQuery}) => {
  const {register, handleSubmit, reset, control} = useForm()
  const baseQuery = {
    include: [
      {
        relation: 'datasets'
      },
      {
        relation: 'members',
        scope: {
          include: [
            {
              relation: 'affiliation'
            },
            {
              relation: 'person'
            }
          ]
        }
      }
    ]
  }

  const Techniques = () => (
    <ListTechniques>
      {listOfTechniques.map((t) => (
        <li key={t}>
          <input
            type="radio"
            name="technique"
            ref={register}
            id={t}
            value={t}
          />
          <label htmlFor={t}>{t}</label>
        </li>
      ))}
    </ListTechniques>
  )

  const submit = (data) => {
    const query = baseQuery
    data.title && (query.where = {title: {ilike: data.title}})
    data.technique && (query.where = {keywords: {inq: [data.technique]}})
    data.wavecheck &&
      data.wavelength &&
      query['include'].unshift({
        relation: 'parameters',
        scope: {
          where: {
            and: [
              {name: 'wavelength'},
              {value: {between: data.wavelength}},
              {unit: 'nm'}
            ]
          }
        }
      })
    console.log('form data: ', data)
    setQuery(query)
  }

  return (
    <Div>
      <form onSubmit={handleSubmit(submit)}>
        <h4>Title:</h4>
        <p>
          <input type="text" ref={register} name="title" />
        </p>
        <p>
          <h4>Wavelength:</h4>
          <SliderWrap>
            <Checkbox type="checkbox" ref={register} name="wavecheck" />
            <Controller
              as={
                <StyledSlider
                  defaultValue={[500, 1500]}
                  min={500}
                  max={1500}
                  renderTrack={Track}
                  renderThumb={Thumb}
                  pearling
                  minDistance={100}
                />
              }
              name="wavelength"
              control={control}
            />
          </SliderWrap>
        </p>
        <h4>Techniques:</h4>
        {/*	 <p><Controller as={<Techniques />} name="technique" control={control} /></p>*/}
        <Techniques />
        <p>
          <input type="submit" value="Search" />
          <input type="button" value="Reset" onClick={() => reset()} />
        </p>
      </form>
    </Div>
  )
}

export default SearchQuery

const StyledSlider = styled(ReactSlider)`
  height: 15px;
  margin-top: 3px;
`

const StyledThumb = styled.div`
  height: 15px;
  line-height: 15px;
  width: 25px;
  text-align: center;
  background-color: white;
  color: black;
  cursor: grab;
  font-size: 10px;
`

const Thumb = (props, state) => (
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
)

const StyledTrack = styled.div`
  top: 40%;
  bottom: 40%;
  background: ${(props) =>
    props.index === 2
      ? 'var(--color-bg-0)'
      : props.index === 1
      ? 'var(--color-highlight)'
      : 'var(--color-bg-0)'};
`

const ListTechniques = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  line-height: 200%;
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />
const Checkbox = styled.input`
  display: inline-block;
`
const SliderWrap = styled.div`
  display: grid;
  grid-template-columns: 2rem 1fr;
`
