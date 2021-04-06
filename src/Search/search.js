import React, {useCallback, useEffect, useState} from 'react'

import {Input, Switch, Checkbox, Label} from '@rebass/forms'
import debounce from 'lodash.debounce'
import {
  evolve,
  assoc,
  is,
  head,
  always,
  equals,
  has,
  propOr,
  __,
  cond,
  concat,
  compose,
  map,
  ifElse,
  gt,
  lt,
  length,
  prop,
  F,
  mergeDeepWith,
  isEmpty,
  dissocPath,
  converge,
  identity,
  reduce,
  mergeRight,
  reject,
  objOf,
  pipe,
  values,
  filter,
  pick,
  when,
  isNil,
  unless,
  T,
} from 'ramda'
import Slider from 'react-rangeslider'
import styled from 'styled-components'

import {useSearchStore} from '../App/stores'
import {Box, Card, Heading, Flex, Button} from '../Primitives'
import filters from './mockTechniques'

const Search = () => {
  const [setFilters, query, setQuery, resetQuery] = useSearchStore((state) => [
    state.setFilters,
    state.query,
    state.setQuery,
    state.resetQuery,
  ])

  const listOfParameters = pipe(
    map(
      pipe(
        mergeRight(objOf('isActive', false)),
        mergeRight(objOf('value', null)),
        converge(objOf, [prop('name'), identity]),
      ),
    ),
    reduce(mergeRight, {}),
  )

  const [parameters, setParameters] = useState(
    listOfParameters(filters.parameters),
  )

  const [techniques, setTechniques] = useState({})

  const [otherFilters, setOtherFilters] = useState({})

  const [activeFilters, setActiveFilters] = useState([])

  const [operators, setOperators] = useState({
    parameters: 'or',
    techniques: 'and',
  })

  useEffect(() => {
    const makeFilter = pipe(head, assoc('target', ['datasets', 'parameters']))
    const makeFilters = pipe(
      objOf('filters'),
      assoc('operator', operators.parameters),
      assoc('target', ['datasets', 'parameters']),
    )
    const toTextFilter = evolve({
      value: converge(objOf, [propOr('like', 'operator'), identity]),
    })
    const toRangeFilter = pipe(
      unless(
        has('unit'),
        when(
          has('defaultUnit'),
          converge(assoc('unit'), [prop('defaultUnit'), identity]),
        ),
      ),
      evolve({
        value: converge(objOf, [propOr('between', 'operator'), identity]),
      }),
    )
    const toFilters = pipe(
      values,
      filter(prop('isActive')),
      reject(pipe(prop('value'), isNil)),
      map(
        cond([
          [pipe(prop('type'), equals('range')), toRangeFilter],
          [pipe(prop('type'), equals('text')), toTextFilter],
          [T, identity],
        ]),
      ),
      cond([
        [pipe(length, equals(1)), makeFilter],
        [pipe(length, lt(1)), makeFilters],
        [T, always({})],
      ]),
    )
    const activeParams = toFilters(parameters)
    setFilters([activeParams])
    console.log('active filters')
    console.log([activeParams])
  }, [parameters, operators, setFilters])

  const debounced = (fn) => debounce(fn, 250)

  const Param = (p) => {
    const inputParams = {
      id: p.name + ' toggle',
      name: p.name + ' toggle',
    }
    return (
      <Box key={p.name}>
        <Label>
          {p.name}
          <Checkbox
            {...inputParams}
            checked={parameters[p.name].isActive}
            onChange={() => toggleFilterActive(p)}
          />
        </Label>
        {p.type === 'range' && (
          //react-rangeslider
          <Slider
            {...inputParams}
            min={p.minValue}
            max={p.maxValue}
            onChangeComplete={debounced(updateFilterValue(p))}
          />
        )}
        {p.type === 'text' && (
          <Input {...inputParams} onChange={debounced(updateFilterValue(p))} />
        )}
        {p.type === 'bool' && (
          <Switch onClick={debounced(updateFilterValue(p))} />
        )}
      </Box>
    )
  }

  const Technique = (technique) => (
    <S.Button key={technique} onClick={() => clickTechnique(technique)}>
      {technique}
    </S.Button>
  )
  const toggleFilterActive = ({name}) => {
    if (parameters[name].isActive === false) {
      setParameters({
        ...parameters,
        [name]: {...parameters[name], isActive: true},
      })
    } else {
      setParameters({
        ...parameters,
        [name]: {...parameters[name], isActive: false},
      })
    }
  }

  const updateRange = (p) => (e) => {
    setParameters({
      ...parameters,
      [p.name]: {
        ...parameters[p.name],
        value: [0, e.target.value * 10],
        isActive: true,
      },
    })
  }
  const updateBool = (p) => (e) => {
    setParameters({
      ...parameters,
      [p.name]: p,
    })
  }
  const updateFilterValue = (p) => (e) => {
    setParameters({
      ...parameters,
      [p.name]: {
        ...parameters[p.name],
        value: p.type === 'range' ? [0, e.target.value * 10] : e.target.value,
        isActive: true,
      },
    })
  }

  const clickTechnique = (xs) => console.log(xs)

  const log = (label) => (xs) => {
    console.log(label)
    console.log(xs)
  }

  return (
    <Card>
      <Flex
        sx={{
          bg: 'middleground',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <S.Input
          sx={{
            outline: 0,
            border: 0,
            fontSize: 2,
          }}
          id="title"
          placeholder="Search by title"
          name="title"
          onChange={debounced(log('title'))}
        />
        <Box>
          <Heading variant="small">Techniques</Heading>
          <Flex
            sx={{
              flexDirection: 'column',
              gap: 1,
              pl: 3,
            }}
          >
            {map(pipe(prop('value'), Technique))(filters.techniques)}
            <Flex>
              <Button
                onClick={() => setOperators({...operators, parameters: 'and'})}
              >
                AND
              </Button>
              <Button
                onClick={() => setOperators({...operators, parameters: 'or'})}
              >
                OR
              </Button>
            </Flex>
            <Heading variant="small">Parameters</Heading>
            {map(Param)(filters.parameters)}
          </Flex>
        </Box>
        <S.Button onClick={() => resetQuery()}>Clear All</S.Button>
      </Flex>
    </Card>
  )
}

export default Search

const S = {}

S.Button = styled(Button).attrs({
  width: 1 / 1,
  sx: {
    mx: 0,
    px: 0,
    my: 0,
    py: 1,
    fontWeight: 400,
    outline: 'none',
    textAlign: 'left',
    bg: 'middleground',
    '&:hover': {color: 'pink'},
  },
})``

S.Input = styled(Input)`
  background-color: ${({theme}) => theme.colors.background}!important;
`
