import React, {useState, useCallback} from 'react'

import {Input} from '@rebass/forms'
import styled from 'styled-components'

import debounce from 'lodash.debounce'

import {
  mergeDeepWith,
  concat,
  compose,
  omit,
  isEmpty,
  filter,
  over,
  lensProp,
  assocPath,
  dissocPath,
} from 'ramda'

import {mockTechniques} from '../App/helpers'
import {useSearchStore} from '../App/stores'
import {Box, Flex, Button, Card} from '../Primitives'

const Search = () => {
  const [
    query,
    setQuery,
    resetQuery,
    buttons,
    setButtons,
  ] = useSearchStore(state => [
    state.query,
    state.setQuery,
    state.resetQuery,
    state.buttons,
    state.setButtons,
  ])

  console.log(query)

  const addTechnique = technique => {
    const newT = {
      ...query,
      where: {
        ...query.where,
        keywords: {
          inq: [technique],
        },
      },
    }

    return mergeState(
      query.where?.keywords?.inq
        ? assocPath(
            ['where', 'keywords', 'inq'],
            [...query.where?.keywords?.inq, technique],
            query
          )
        : newT
    )
  }

  const removeTechnique = technique => ({
    ...query,
    where: {
      ...query.where,
      keywords: {inq: filter(s => s !== technique, query.where.keywords.inq)},
    },
  })

  const addOrRemove = technique =>
    query.where?.keywords?.inq.includes(technique)
      ? removeTechnique(technique)
      : addTechnique(technique)

  const stripEmpty = obj =>
    isEmpty(obj.where?.keywords?.inq)
      ? over(lensProp('where'), omit(['keywords']), obj)
      : obj

  // const mergeState = newState => mergeDeepWith(concat, query, newState)
  const mergeState = obj => obj
  const updateTechniques = compose(setQuery, stripEmpty, addOrRemove)

  const debounced = useCallback(
    debounce(str => updateTitle(str), 500),
    []
  )

  const titleSearch = title => {
    console.log(query.where)
    const withTitle = {
      ...query,
      where: {
        ...query.where,
        title: {ilike: title},
      },
    }
    console.log(withTitle)
    return mergeState(withTitle)
  }
  const stripEmptyTitle = obj =>
    isEmpty(obj.where?.title?.ilike)
      ? over(lensProp('where'), omit(['title']), obj)
      : obj
  const updateTitle = compose(setQuery, stripEmptyTitle, titleSearch)

  const onTitleInput = e => debounced(e.target.value)
  const isApplied = technique =>
    query.where?.keywords?.inq.includes(technique) ? 'background' : 'foreground'

  return (
    <Box>
      <Card>
        <Box my={2}>
          <Input
            id="title"
            placeholder="Search titles"
            name="title"
            defaultValue={query.where?.title?.ilike}
            onChange={onTitleInput}
          />
        </Box>
        <Flex
          sx={{
            flexDirection: 'column',
            gap: 1,
          }}
        >
          {mockTechniques.map((technique, index) => (
            <S.Button
              key={index}
              bg={isApplied(technique)}
              onClick={() => updateTechniques(technique)}
            >
              {technique}
            </S.Button>
          ))}
        </Flex>
      </Card>
    </Box>
  )
}

export default Search

const S = {}

S.Button = styled(Button).attrs({
  width: 1 / 1,
  sx: {
    textAlign: 'left',
  },
})``
