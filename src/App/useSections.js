import React, {Suspense, useState, useEffect, cloneElement} from 'react'

import {useSwipeable} from 'react-swipeable'
import {findIndex, propEq} from 'ramda'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useNavigationStore, useAppStore} from '../App/stores'
import {Box, Heading} from '../Primitives'

const useSections = (sections, main) => {
  const mainComponent = main ?? 0
  const [isShowing, setIsShowing] = useState(sections[mainComponent].name)
  const setSections = useNavigationStore(state => state.setSections)
  const isDesktop = useAppStore(state => state.isDesktop)

  const shown = findIndex(propEq('name', isShowing), sections)
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIsShowing(sections[Math.abs((shown + 1) % sections.length)].name),
    onSwipedRight: () =>
      setIsShowing(sections[Math.abs((shown - 1) % sections.length)].name),
  })

  console.log(shown)

  useEffect(() => {
    //save sections to navigation store
    const sectionsObj = sections.map((section, index) => ({
      key: index,
      //indicates whether section is being shown
      active: isShowing === section.name,
      //whether is shown as default on page view
      main: mainComponent === index,
      //does state & titles
      name: section.name,
      //changes which component is being shown
      onClick: () => setIsShowing(section.name),
      //whether homebutton should be overriden and point to this section
      overrideHome: section.overrideHome,
    }))

    setSections(sectionsObj)
  }, [sections, mainComponent, setSections, isShowing])

  const Arrange = () => (
    <Box {...handlers}>
      {sections.map(
        (section, index) =>
          (section.name === isShowing || isDesktop) && (
            <Box
              key={index}
              width={isDesktop ? section.width ?? [1, 1, 1 / 3] : [1]}
              name={section.name}
            >
              <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                  {section.hideTitle || (
                    <Heading variant="display">{section.name}</Heading>
                  )}
                  {cloneElement(section.component, {isShowing})}
                </Suspense>
              </ErrorBoundary>
            </Box>
          )
      )}
    </Box>
  )

  return {Arrange, isShowing}
}

export default useSections

/* HOW TO USE THIS 
 * This one should have a storybook :/	
 *  	
  const sectionsArray = [
	  {
		  name: 'component name',
		  component: <Component />,

		//Keys bellow are optional, see defaults
		//array of widths, each key corresnponds to a breakpoint
		  width: [1, 1, 1/3], 
		//whether title for component should be automatically rendered
		  hideTitle:  false,
		//whether homebutton should point to this section
		  overrideHome: false
	  }, {...}, {...}
  ]
 
  const {Arrange, isShowing} = useSections(sectionsArray, mainSectionKey)

  console.log(`which component is currently being shown ${isShowing}`)

	
  return <Arrange />

*/
