import React, {Suspense, useState, useEffect, cloneElement} from 'react'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useNavigationStore, useAppStore} from '../App/stores'
import {Box, Heading} from '../Primitives'

const useSidebars = (sections, main) => {
  const [isShowing, setIsShowing] = useState(sections[main ?? 0].name)
  const setSections = useNavigationStore(state => state.setSections)
  const desktopView = useAppStore(state => state.desktopView)

  useEffect(() => {
    const sectionsObj = sections.map((section, index) => ({
      key: index,
      active: isShowing === section.name,
      main: main ?? 0 === index,
      name: section.name,
      onClick: () => setIsShowing(section.name),
      overrideHome: section.overrideHome,
    }))

    setSections(sectionsObj)
  }, [sections, setSections, isShowing, main, desktopView])

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
