import React, {useState, useRef} from 'react'

import styled from 'styled-components'

import {Box} from '../Primitives'
import breakpoints from '../Theme/breakpoints'

const useThreeColLayout = () => {
  const hasLeftBar = useRef()
  const [sidebar, setSidebar] = useState(false)
  const Left = ({children}) => {
    hasLeftBar.current = true
    return <S.Left expand={sidebar} children={children} />
    // return hasChildren ? <S.Left expand={sidebar} children={children} /> : null
  }
  const Right = ({children}) => <S.Right expand={sidebar} children={children} />
  const Middle = ({children}) =>
    hasLeftBar.current ? (
      window.innerWidth < parseInt(breakpoints[1]) ? (
        !sidebar ? (
          <S.Middle expand={sidebar} children={children} />
        ) : null
      ) : (
        <S.Middle expand={sidebar} children={children} />
      )
    ) : (
      <S.NoLeft expand={sidebar} children={children} />
    )
  return {sidebar, setSidebar, Layout, Left, Right, Middle}
}

export default useThreeColLayout

const S = {}

S.Left = styled(Box)`
  @media (max-width: ${({theme}) => theme.breakpoints[1]}) {
    display: ${props => (props.expand === 'left' ? 'block' : 'none')};
  }
`
S.Right = styled(Box)`
  @media (max-width: ${({theme}) => theme.breakpoints[1]}) {
    display: ${props => (props.expand === 'right' ? 'block' : 'none')};
  }
`
S.Middle = styled(Box)`
  @media (max-width: ${({theme}) => theme.breakpoints[1]}) {
    display: ${props => (!props.expand ? 'block' : 'none')};
  }
`
S.NoLeft = styled(Box)`
  grid-column: 1 / 3;
  @media (max-width: ${({theme}) => theme.breakpoints[[1]]}) {
    display: ${props =>
      props.expand === 'left' || !props.expand ? 'block' : 'none'};
    grid-column: 1 / 2;
  }
`
const Layout = styled(Box).attrs({
  sx: {
    display: 'grid',
    gridGap: [2, 1, 2, 3],
    gridTemplateColumns: '15% 1fr 15%',
    p: [1, 1, 2, 3],
    height: '100%',
  },
})`
  @media (max-width: ${({theme}) => theme.breakpoints[[1]]}) {
    grid-template-columns: 1fr;
  }
`
