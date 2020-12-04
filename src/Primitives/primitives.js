import React from 'react'

import styled from 'styled-components'

import useThreeColLayout from '../App/useSidebar'
import {Box, Button, Card, Flex, Heading, Image, Link, Text} from './'

const S = {}

const SampleImageCard = () => (
  <S.Pads>
    <Card>
      <Image src="https://source.unsplash.com/random/600x600" />
    </Card>
  </S.Pads>
)
S.Pads = styled(Box).attrs({
  p: [0, 1, 2, 3],
  py: [1],
  width: [1, 1, 1 / 2, 1 / 3],
})``

const Search = () => (
  <Card>
    <Heading variant="display">NICUH</Heading>
    <Text>Text in Text</Text>
    <Box>
      <Link href="">Link</Link>
    </Box>
  </Card>
)
const Documents = () => (
  <Box>
    <Flex flexWrap="wrap" my={[-1, -1, -2, -3]}>
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
)

const Environments = () => {
  return (
    <S.Sidebar>
      <Heading>Sidebar</Heading>
      <Box>
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
      </Box>
    </S.Sidebar>
  )
}

const Primitives = () => {
  const {Layout, Left, Right, Middle} = useThreeColLayout()

  return (
    <Layout>
      <Left>
        <Search />
      </Left>
      <Middle>
        <Documents />
      </Middle>
      <Right>
        <Environments />
      </Right>
    </Layout>
  )
}
export default Primitives

S.Sidebar = styled(Card)``
