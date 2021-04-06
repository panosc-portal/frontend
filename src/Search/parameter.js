import {useState, useEffect} from 'react'

import {Label, Input, Radio, Slider} from '@rebass/forms'
import {pipe, has, prop, cond} from 'ramda'

import {Box} from '../Primitives'

const RangeOperators = ['between']
const TextOperators = ['like', 'nlike', 'regexp']

const Operators = ({type, update}) => {
  const [list, setList] = useState([])
  switch (type) {
    case 'range':
      setList(RangeOperators)
      break
    case 'text':
      setList(TextOperators)
      break
    default:
      break
  }

  const [chosen, setChosen] = useState(list[0])
  useEffect(() => {
    update(chosen)
  }, [update, chosen])

  const Operator = (operator) => (
    <Label>
      <Radio
        name="value operator"
        id={operator}
        value={operator}
        onClick={() => setChosen(operator)}
      />
      {operator}
    </Label>
  )

  const isMany = list.length > 1
  return (
    <>{isMany && list.map((operator) => <Operator operator={operator} />)}</>
  )
}

const Parameter = ({skeleton, updateFn}) => {
  const [filter, setFilter] = useState(skeleton)
  useEffect(() => {
    updateFn(filter)
  }, [filter, updateFn])
  const updateValueOperator = (operator) => setFilter({...filter, operator})

  return (
    <Box>
      <Operators update={updateValueOperator} type={filter.type} />
      <Label htmlFor={skeleton.name}>{filter.name}</Label>
      {filter?.operator === 'between' && (
        <Slider
          id={skeleton.name}
          name={skeleton.name}
          onChange={(e) =>
            setFilter({...filter, value: e.target.value, enabled: true})
          }
        />
      )}
      {filter?.type === 'text' && (
        <Input
          id={skeleton.name}
          name={skeleton.name}
          onChange={(e) =>
            setFilter({...filter, value: e.target.value, enabled: true})
          }
        />
      )}
    </Box>
  )
}
const Text = ({render, update}) => {}
const Bool = ({render, update}) => {}
const Enum = ({render, update}) => {}

// const Parameter = (skeleton, update) => {
//   const [state, setState] = useState({...skeleton, enabled: false})
//   useEffect(() => {
//     update(state)
//   }, [update, state])
//   return (
//     <>
//       skeleton?.type === 'range' && <Range render={state} update={setState} />
//       skeleton?.type === 'text' && <Text render={state} update={setState} />
//       skeleton?.type === 'bool' && <Bool render={state} update={setState} />
//       skeleton?.type === 'enum' && <Enum render={state} update={setState} />
//     </>
//   )
// }
export default Parameter
