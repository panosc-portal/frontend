import React, {useState} from 'react'
import ReactSlider from 'react-slider'
import styled from 'styled-components'
import {useForm, Controller} from 'react-hook-form'

// const removeEmpty = (obj) => {
//   Object.keys(obj).forEach((key) => {
//     if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key])
//     else if (obj[key] === undefined) delete obj[key]
//   })
//   return obj
// }

const listOfTechniques = [
	"nadion thrust assembly",
	"deuterium flow regulator"
]

const SearchQuery = ({setQuery}) => {
  const {register, handleSubmit, control} = useForm()
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

	const techniques = () => (<ListTechniques>
		{	listOfTechniques.map(t => (<li key={t}> 
			<input type="radio" name="technique" id={t} value={t} />
			<label htmlFor={t}>{t}</label>
		</li>))}
	</ListTechniques>)
	
  const submit = (data) => {
	  const query = baseQuery
    data.title && (query.where = {title: {ilike: data.title}})
    // data.wavelength && query['include'].push({
    //   relation: 'parameters',
    //   scope: {
    //     where: {
    //       and: [
    //         {name: 'wavelength'},
    //         {value: {between: data.wavelength}},
    //         {unit: 'nm'}
    //       ]
    //     }
    //   }
    // })
    setQuery(query)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
       <p>Title: <input type="text" ref={register} name="title" /></p>
        <p><Controller
          as={
            <StyledSlider
              defaultValue={[0, 2000]}
              min={0}
              max={2000}
              renderTrack={Track}
              renderThumb={Thumb}
              pearling
              minDistance={10}
            />
          }
          name="wavelength"
          control={control}
        /></p>
	 <p>{techniques()}</p>
       <p><input type="submit" value="Search" /></p>
      </form>
    st</div>
  )
}

export default SearchQuery

const StyledSlider = styled(ReactSlider)`
  width: 100%;
  height: 25px;
`

const StyledThumb = styled.div`
  height: 25px;
  line-height: 25px;
  width: 25px;
  text-align: center;
  background-color: rebeccapurple;
  color: white;
  border-radius: 50%;
  cursor: grab;
`

const Thumb = (props, state) => (
  <StyledThumb {...props}>
	 {/*state.valueNow*/}
	</StyledThumb>
)

const StyledTrack = styled.div`
  top: 40%;
  bottom: 40%;
  background: ${(props) =>
    props.index === 2 ? '#ddd' : props.index === 1 ? '#0f0' : '#ddd'};
`

const ListTechniques = styled.ul`
list-style-type: none;
margin: 0;
padding:0;
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />
