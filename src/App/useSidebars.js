import React, {Suspense, useState} from 'react'

import {useWindowWidth} from '@react-hook/window-size'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {Box, Link, Heading} from '../Primitives'
import breakpoints from '../Theme/breakpoints'

const useSidebars = main => {
  const [showed, setShowed] = useState(encodeURIComponent(main))
  const windowWidth = useWindowWidth()
  const desktopView = windowWidth > parseInt(breakpoints[1]) * 16
  const ControlButton = props => {
    const identifier = encodeURIComponent(props.name)
    return (
      <Link
        sx={{
          textAlign: 'center',
          color: showed === identifier && 'primary',
        }}
        variant="nav"
        width={props.width && props.width}
        onClick={() => setShowed(identifier)}
      >
        {props.name}
      </Link>
    )
  }
  const ControlWrapper = props => {
    const identifier = encodeURIComponent(props.name)

    return (
      (identifier === showed || desktopView) && (
        <Box width={props.width && props.width}>
          <Heading variant="display">{props.name}</Heading>
          {props.children}
        </Box>
      )
    )
  }
  const ControlBar = props => (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        display: ['flex', 'flex', 'none'],
        justifyContent: 'space-around',
        width: '100%',
        height: 'nav',
        bg: 'nav',
      }}
    >
      {props.children}
    </Box>
  )
  const AutoArrange = ({sections}) => (
    <>
      {sections.map((section, index) => (
        <ControlWrapper key={index} width={section.width} name={section.name}>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>{section.component}</Suspense>
          </ErrorBoundary>
        </ControlWrapper>
      ))}

      <ControlBar>
        {sections.map((section, index) => (
          <ControlButton
            key={index}
            width={1 / sections.length}
            name={section.name}
          />
        ))}
      </ControlBar>
    </>
  )

  return {ControlButton, ControlWrapper, ControlBar, AutoArrange, showed}
}

export default useSidebars
