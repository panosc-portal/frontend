import React, {useState} from 'react'
import ReactSlider from 'react-slider'
import styled from 'styled-components'
import {useForm} from 'react-hook-form'

const removeEmpty = (obj) => {
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === 'object') removeEmpty(obj[key])
    else if (obj[key] === undefined) delete obj[key]
  })
  return obj
}

const SearchQuery = ({setQuery}) => {
  // const [preQuery, setPreQuery] = useState(baseQuery)
  const {register, handleSubmit, watch, errors} = useForm()
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
  const submit = (data) => {
    // setQuery(
    //   removeEmpty({
    //     ...baseQuery,
    //     where: {
    //       title: {ilike: data.title}
    //     }
    //   })
    // )
	const query = {...baseQuery, where: {title: {ilike: data.title}}}
	  data.title || delete query.where.title
	  setQuery(query)
    console.log(query)
  }

  // const submit = async (evt) => {
  //   evt.preventDefault()

  // }
  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        Title: <input type="text" ref={register} name="title" />
        <br />
        <StyledSlider
          defaultValue={[0, 100]}
          renderTrack={Track}
          renderThumb={Thumb}
          pearling
          minDistance={10}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
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
  <StyledThumb {...props}>{state.valueNow}</StyledThumb>
)

const StyledTrack = styled.div`
  top: 40%;
  bottom: 40%;
  background: ${(props) =>
    props.index === 2 ? '#ddd' : props.index === 1 ? '#0f0' : '#ddd'};
`

const Track = (props, state) => <StyledTrack {...props} index={state.index} />

// preQuery.fulltext
//       ? setQuery({
//           where: {
//             title: {ilike: preQuery.fulltext}
//           },
//           include: [
//             {
//               relation: 'datasets'
//             },
//             {
//               relation: 'members',
//               scope: {
//                 include: [
//                   {
//                     relation: 'affiliation'
//                   },
//                   {
//                     relation: 'person'
//                   }
//                 ]
//               }
//             }
//           ]
//         })
//       : setQuery({
//           include: [
//             {
//               relation: 'datasets'
//             },
//             {
//               relation: 'members',
//               scope: {
//                 include: [
//                   {
//                     relation: 'affiliation'
//                   },
//                   {
//                     relation: 'person'
//                   }
//                 ]
//               }
//             }
//           ]
//         })
