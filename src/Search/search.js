import React, {useCallback} from 'react'

import {Input} from '@rebass/forms'
import styled from 'styled-components'
import produce from 'immer'

import debounce from 'lodash.debounce'
import {baseQuery} from '../App/helpers'

import {isNil, concat, compose, mergeDeepWith, isEmpty, dissocPath} from 'ramda'

import {mockTechniques} from '../App/helpers'
import {useSearchStore} from '../App/stores'
import {Box, Flex, Button} from '../Primitives'

const Search = () => {
  const [query, setQuery, resetQuery] = useSearchStore(state => [
    state.query,
    state.setQuery,
    state.resetQuery,
  ])

  const addTechnique = technique =>
    produce(query.where?.keywords?.inq ?? [], draftTechniques => {
      draftTechniques.push(technique)
    })

  const removeTechnique = technique =>
    produce(query.where?.keywords?.inq ?? [], draftTechniques => {
      draftTechniques.splice(
        draftTechniques.findIndex(t => t === technique),
        1
      )
    })

  const handleTechnique = technique =>
    query.where?.keywords?.inq.includes(technique)
      ? removeTechnique(technique)
      : addTechnique(technique)

  const debouncedTitleChange = debounce(
    title => update(title, query.where?.keywords?.inq ?? []),
    500
  )

  const handleTitle = e => debouncedTitleChange(e.target.value)

  const isApplied = technique =>
    query.where?.keywords?.inq.includes(technique) ? 'red' : 'text'

  const stripTechniques = obj =>
    isEmpty(obj.where?.keywords?.inq) || isNil(obj.where?.keywords?.inq)
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
        defaultValue={query.where?.title?.ilike}
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
            color={isApplied()}
            onClick={() =>
              update(
                query.where?.title?.ilike ?? '',
                handleTechnique(technique)
              )
            }
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
