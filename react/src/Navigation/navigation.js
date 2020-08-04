import React from 'react'

import {Flex, Link, Box} from 'rebass/styled-components'
import styled from 'styled-components'

const Navigation = () => {
  return (
    <S.Flex>
      <Link variant="nav" href="/">
        PaNOSC
      </Link>
      <Box mx="auto" />
      <Link variant="nav" href="/dashboard">
        Dashboard
      </Link>
    </S.Flex>
  )
}

export default Navigation

const S = {}
S.Flex = styled(Flex)`
  background-color: ${props => props.theme.colors.gray};
`
