import React, {useState} from 'react'

import styled from 'styled-components'

import {Box} from '../Primitives'

const useThreeColLayout = () => {
  const [sidebar, setSidebar] = useState('left')
  const Left = ({children}) => <S.Left expand={sidebar} children={children} />
  const Right = ({children}) => <S.Right expand={sidebar} children={children} />
  const Middle = ({children}) => (
    <S.Middle expand={sidebar} children={children} />
  )
  return {sidebar, setSidebar, Layout, Left, Right, Middle}
}

export default useThreeColLayout

const S = {}

S.Left = styled(Box)`
  @media (max-width: ${({theme}) => theme.breakpoints[[1]]}) {
    display: ${props => (props.expand === 'left' ? 'block' : 'none')};
  }
`
S.Right = styled(Box)`
  @media (max-width: ${({theme}) => theme.breakpoints[[1]]}) {
    display: ${props => (props.expand === 'right' ? 'block' : 'none')};
  }
`
S.Middle = styled(Box)`
  @media (max-width: ${({theme}) => theme.breakpoints[[1]]}) {
    display: ${props => (!props.expand ? 'block' : 'none')};
  }
`
const Layout = styled(Box).attrs({
  sx: {
    display: 'grid',
    gridGap: [2, 1, 2, 3],
    gridTemplateColumns: '25% 1fr 25%',
  },
})`
  @media (max-width: ${({theme}) => theme.breakpoints[[1]]}) {
    grid-template-columns: 1fr;
  }
`
