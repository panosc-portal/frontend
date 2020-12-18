import React from 'react'

import css from '@styled-system/css'
import styled from 'styled-components'

import {Text} from './'

export const Ul = props => <S.ul {...props} />
export const Li = props => (
  <S.li {...props}>
    <Text color="text">{props.children}</Text>
  </S.li>
)

const S = {}

S.ul = styled.ul(
  css({
    listStyle: 'square',
    pl: 3,
    my: 1,
  })
)
S.li = styled.li(
  css({
    color: 'red',
  })
)
