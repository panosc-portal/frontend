import React, {useCallback, useState} from 'react'

import {Input} from '@rebass/forms'
import styled from 'styled-components'
import produce from 'immer'

import debounce from 'lodash.debounce'
import {baseQueryWhere, baseQuery} from '../App/helpers'

import {
  isNil,
  concat,
  view,
  compose,
  mergeDeepWith,
  isEmpty,
  set,
  dissocPath,
  lensPath,
} from 'ramda'

import {mockTechniques} from '../App/helpers'
import {useSearchStore} from '../App/stores'
import {Box, Flex, Button} from '../Primitives'

const Search = () => {
  const [query, setQuery, resetQuery] = useSearchStore(state => [
    state.query,
    state.setQuery,
    state.resetQuery,
  ])

  const techniques = query.where?.keywords?.inq ?? []
  const title = query.where?.title?.ilike ?? ''

  const addTechnique = technique =>
    produce(techniques, draftTechniques => {
      draftTechniques.push(technique)
    })

  const removeTechnique = technique =>
    produce(techniques, draftTechniques => {
      draftTechniques.splice(
        draftTechniques.findIndex(t => t === technique),
        1
      )
    })

  const handleTechnique = technique =>
    techniques.includes(technique)
      ? removeTechnique(technique)
      : addTechnique(technique)

  const debouncedTitleChange = debounce(title => update(title, techniques), 500)

  const handleTitle = e => debouncedTitleChange(e.target.value)

  const isApplied = technique =>
    techniques.includes(technique) ? 'red' : 'text'

  const stripTechniques = obj =>
    isEmpty(obj.where?.keywords?.inq)
      ? dissocPath(['where', 'keywords'], obj)
      : obj
  const stripTitle = obj =>
    isEmpty(obj.where?.title?.ilike) ? dissocPath(['where', 'title'], obj) : obj
  const stripWhere = obj =>
    isEmpty(obj.where?.title?.ilike) && isEmpty(obj.where?.keywords?.inq)
      ? dissocPath(['where'], obj)
      : obj

  const whereQuery = useCallback((title, techniques) => {
    const newQuery = {
      where: {
        keywords: {
          inq: techniques,
        },
        title: {
          ilike: title,
        },
      },
    }
    return newQuery
  }, [])

  const updateQuery = useCallback(
    newQuery => {
      const qq = mergeDeepWith(concat, newQuery, baseQuery)
      console.log(qq)
      setQuery(qq)
    },
    [setQuery]
  )

  const update = compose(
    updateQuery,
    stripWhere,
    stripTechniques,
    stripTitle,
    whereQuery
  )

  return (
    <Flex
      sx={{
        bg: 'middleground',
        flexDirection: 'column',
        gap: 3,
      }}
    >
      <Input
        id="title"
        placeholder="Search titles"
        name="title"
        defaultValue={title}
        onChange={handleTitle}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {mockTechniques.map((technique, index) => (
          <S.Button
            key={index}
            color={techniques.includes(technique) ? 'red' : 'blue'}
            onClick={() => update(title, handleTechnique(technique))}
          >
            {technique}
          </S.Button>
        ))}
      </Flex>
      <S.Button onClick={() => resetQuery()}>Clear All</S.Button>
    </Flex>
  )
}

export default Search

const S = {}

S.Button = styled(Button).attrs({
  width: 1 / 1,
  sx: {
    fontWeight: 400,
    outline: 'none',
    textAlign: 'left',
    bg: 'middleground',
  },
})``
