import React from 'react'

import styled from 'styled-components'

import {Box, Button, Card, Flex, Heading, Image, Link, Text} from './'

const Primitives = () => {
  const SampleImageCard = () => (
    <S.Pads>
      <Card>
        <Image src="https://source.unsplash.com/random/600x600" />
      </Card>
    </S.Pads>
  )
  return (
    <S.SidebarLayout>
      <Box>
        <Card>
          <Heading variant="display">Heading in Card</Heading>
          Text in Card
          <Text>Text in Text</Text>
          <Box>
            <Link href="">Link</Link>
          </Box>
        </Card>
        <Flex flexWrap="wrap" mx={[-1, -2]}>
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
          <SampleImageCard />
        </Flex>
      </Box>
      <S.Sidebar>
        <S.Controller>
          <Button>#</Button>
        </S.Controller>
        <S.Content>
          <Heading>Sidebar</Heading>
          <Box>
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
          </Box>
        </S.Content>
      </S.Sidebar>
    </S.SidebarLayout>
  )
}

export default Primitives

const S = {}
S.Pads = styled(Box).attrs({
  px: [1, 2],
  width: [1, 1 / 2, 1 / 3, 1 / 4],
})``
S.Content = styled(Card).attrs()``
S.Sidebar = styled.aside``
S.Controller = styled(Card).attrs()`
  display: none;
`
S.SidebarLayout = styled(Box).attrs({
  sx: {display: 'grid', gap: 3, gridTemplateColumns: '1fr 25%'},
})`
  @media screen and (max-width: ${({theme}) => theme.breakpoints[0]}) {
    grid-template-columns: 1fr;
    ${S.Content} {
      display: none;
    }
    ${S.Controller} {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
  }
`
