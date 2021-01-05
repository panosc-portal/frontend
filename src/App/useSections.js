import React, {Suspense, useState, useEffect, cloneElement} from 'react'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useNavigationStore, useAppStore} from '../App/stores'
import {Box, Heading} from '../Primitives'

const useSections = (sections, main) => {
  const mainComponent = main ?? 0
  const [isShowing, setIsShowing] = useState(sections[mainComponent].name)
  const setSections = useNavigationStore(state => state.setSections)
  const isDesktop = useAppStore(state => state.isDesktop)

  useEffect(() => {
    const sectionsObj = sections.map((section, index) => ({
      key: index,
      active: isShowing === section.name,
      main: mainComponent === index,
      name: section.name,
      onClick: () => setIsShowing(section.name),
      overrideHome: section.overrideHome,
    }))

    setSections(sectionsObj)
  }, [sections, mainComponent, setSections, isShowing])

  const SBWrapper = props =>
    (props.name === isShowing || isDesktop) && (
      <Box width={props.width && props.width}>{props.children}</Box>
    )

  const Arrange = () =>
    sections.map((section, index) => (
      <SBWrapper key={index} width={section.width} name={section.name}>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            {section.hideTitle || (
              <Heading variant="display">{section.name}</Heading>
            )}
            {cloneElement(section.component, {isShowing})}
          </Suspense>
        </ErrorBoundary>
      </SBWrapper>
    ))

  return {Arrange, isShowing}
}

export default useSections
