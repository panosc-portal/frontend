import React, {useCallback, useState} from 'react'

import {Input} from '@rebass/forms'
import produce from 'immer'
import debounce from 'lodash.debounce'
import {concat, compose, mergeDeepWith, isEmpty, dissocPath} from 'ramda'
import styled from 'styled-components'

import {baseQuery} from '../App/helpers'
import {mockTechniques} from '../App/helpers'
import {useSearchStore} from '../App/stores'
import {Box, Card, Heading, Flex, Button} from '../Primitives'

const Search = () => {
  const [query, setQuery, resetQuery] = useSearchStore((state) => [
    state.query,
    state.setQuery,
    state.resetQuery,
  ])

  const techniques = query.where?.keywords?.inq ?? []
  const [usedTechniques, setUsedTechniques] = useState(techniques)

  const title = query.where?.title?.ilike ?? ''

  const addTechnique = (technique) =>
    produce(techniques, (draftTechniques) => {
      draftTechniques.push(technique)
    })

  const removeTechnique = (technique) =>
    produce(techniques, (draftTechniques) => {
      draftTechniques.splice(
        draftTechniques.findIndex((t) => t === technique),
        1,
      )
    })

  const handleTechnique = (technique) => {
    if (techniques.includes(technique)) {
      const newTechniques = produce(usedTechniques, (draft) => {
        return draft.filter((t) => t !== technique)
      })
      setUsedTechniques(newTechniques)
      return removeTechnique(technique)
    } else {
      const newTechniques = produce(usedTechniques, (draft) => {
        draft.push(technique)
      })
      setUsedTechniques(newTechniques)
      return addTechnique(technique)
    }
  }

  const debouncedTitleChange = debounce(
    (title) => update(title, techniques),
    500,
  )

  const handleTitle = (e) => debouncedTitleChange(e.target.value)

  const stripTechniques = (obj) =>
    isEmpty(obj.where?.keywords?.inq)
      ? dissocPath(['where', 'keywords'], obj)
      : obj
  const stripTitle = (obj) =>
    isEmpty(obj.where?.title?.ilike) ? dissocPath(['where', 'title'], obj) : obj
  const stripWhere = (obj) =>
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
    (newQuery) => {
      const qq = mergeDeepWith(concat, newQuery, baseQuery)
      setQuery(qq)
    },
    [setQuery],
  )

  const update = compose(
    updateQuery,
    stripWhere,
    stripTechniques,
    stripTitle,
    whereQuery,
  )

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
          defaultValue={title}
          onChange={handleTitle}
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
            {mockTechniques.map((technique, index) => (
              <S.Button
                key={index}
                color={usedTechniques.includes(technique) ? 'pink' : 'text'}
                fontWeight={usedTechniques.includes(technique) ? 700 : 400}
                onClick={() => update(title, handleTechnique(technique))}
              >
                {technique}
              </S.Button>
            ))}
          </Flex>
        </Box>
        <S.Button onClick={() => resetQuery() || setUsedTechniques([])}>
          Clear All
        </S.Button>
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
