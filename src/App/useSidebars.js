import React, {Suspense, useState, useEffect, cloneElement} from 'react'

import {useWindowWidth} from '@react-hook/window-size'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useNavigationStore} from '../App/stores'
import {Box, Text, Link, Heading} from '../Primitives'
import breakpoints from '../Theme/breakpoints'
import {S} from '../Navigation/navigation'

const useSidebars = (sections, main) => {
  const [isShowing, setIsShowing] = useState(sections[main ?? 0].name)
  const setSections = useNavigationStore(state => state.setSections)
  const windowWidth = useWindowWidth()
  const desktopView = windowWidth > parseInt(breakpoints[1]) * 16

  useEffect(() => {
    const NavigationButtons = () =>
      sections.map((section, index) => (
        <SBButton key={index} name={section.name} />
      ))
    setSections(NavigationButtons())
  }, [sections, setSections])

  const SBButton = props => (
    <S.NavItem
      onClick={() => setIsShowing(props.name)}
      className={isShowing === props.name && 'active'}
    >
      {props.name.length > 15 ? `${props.name.substring(0, 15)}..` : props.name}
    </S.NavItem>
  )

  const SBWrapper = props =>
    (props.name === isShowing || desktopView) && (
      <Box width={props.width && props.width}>
        <Heading variant="display">{props.name}</Heading>
        {props.children}
      </Box>
    )

  const Arrange = () =>
    sections.map((section, index) => (
      <SBWrapper key={index} width={section.width} name={section.name}>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            {cloneElement(section.component, {isShowing})}
          </Suspense>
        </ErrorBoundary>
      </SBWrapper>
    ))

  return {Arrange, isShowing}
}

export default useSidebars
