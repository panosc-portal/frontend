import React, {useState} from 'react'

// const proposedQuery = {
//   include: [
//     {
//       relation: 'datasets'
//     },
//     {
//       relation: 'members',
//       scope: {
//         include: [
//           {
//             relation: 'affiliation'
//           },
//           {
//             relation: 'person'
//           }
//         ]
//       }
//     }
//   ]
// }

// Wavelength: <input type="range" name="wavelength" />
//
const SearchQuery = ({setQuery}) => {
  const [preQuery, setPreQuery] = useState({})
  const submit = async (evt) => {
    evt.preventDefault()
    setQuery({
      where: {
        title: {ilike: preQuery.fulltext}
      },
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
    })
  }
  return (
    <div>
      <form onSubmit={submit}>
        Fulltext:{' '}
        <input
          type="text"
          onChange={(e) => setPreQuery({...preQuery, fulltext: e.target.value})}
        />
        <input type="submit" value="Search" />
      </form>
    </div>
  )
}

export default SearchQuery
