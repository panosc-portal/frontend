import React, {useState} from 'react'

import {useWindowWidth} from '@react-hook/window-size'

import {Button, Flex, Box, Link, Heading} from '../Primitives'
import breakpoints from '../Theme/breakpoints'

const useMobileNav = main => {
  const [showed, setShowed] = useState(encodeURIComponent(main))
  const windowWidth = useWindowWidth()
  const mobileView = windowWidth > parseInt(breakpoints[1]) * 16
  const ControlButton = props => {
    const identifier = encodeURIComponent(props.name)
    return (
      <Link
        sx={{color: showed === identifier && 'primary'}}
        variant="nav"
        onClick={() => setShowed(identifier)}
      >
        {props.name}
      </Link>
    )
  }
  const ControlWrapper = props => {
    const identifier = encodeURIComponent(props.name)

    return (
      (identifier === showed || mobileView) && (
        <Box width={props.width && props.width}>
          <Heading variant="display">{props.name}</Heading>
          {props.children}
        </Box>
      )
    )
  }
  const ControlBar = props => (
    <Flex
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        display: ['block', 'block', 'none'],
        justifyContent: 'space-around',
        width: '100%',
        bg: 'nav',
      }}
    >
      {props.children}
    </Flex>
  )
  const AutoArrange = ({sections}) => (
    <>
      {sections.map((section, index) => (
        <ControlWrapper key={index} width={section.width} name={section.name}>
          {section.component}
        </ControlWrapper>
      ))}
      <ControlBar>
        {sections.map((section, index) => (
          <ControlButton key={index} name={section.name} />
        ))}
      </ControlBar>
    </>
  )

  return {ControlButton, ControlWrapper, ControlBar, AutoArrange, showed}
}

export default useMobileNav
