/* Originally this hook did way less and was nice and clean,
 * not sure I still like it but does the job */

import React, {Suspense, useState, useEffect, cloneElement} from 'react'

import {findIndex, propEq} from 'ramda'
import {useSwipeable} from 'react-swipeable'

import ErrorBoundary from '../App/errorBoundary'
import Spinner from '../App/spinner'
import {useNavigationStore, useAppStore} from '../App/stores'
import {Box, Heading} from '../Primitives'

const useSections = (sections, main) => {
  const mainComponent = main ?? 0
  const [isShowing, setIsShowing] = useState(sections[mainComponent].name)
  const setSections = useNavigationStore(state => state.setSections)
  const isDesktop = useAppStore(state => state.isDesktop)

  //how heavy is too heavy? :(
  const shown = findIndex(propEq('name', isShowing), sections)
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIsShowing(sections[(shown + 1) % sections.length].name),
    onSwipedRight: () =>
      setIsShowing(
        sections[
          (shown !== 0 ? shown - 1 : sections.length - 1) % sections.length
        ].name
      ),
  })

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
    <>
      {sections.map(
        (section, index) =>
          (section.name === isShowing || isDesktop) && (
            <Box
              key={index}
              width={section.width ?? [1, 1, 1 / 3]}
              name={section.name}
            >
              <ErrorBoundary>
                <Suspense fallback={<Spinner />}>
                  <Box {...handlers}>
                    {section.hideTitle || (
                      <Heading variant="display">{section.name}</Heading>
                    )}
                    {cloneElement(section.component, {isShowing})}
                  </Box>
                </Suspense>
              </ErrorBoundary>
            </Box>
          )
      )}
    </>
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
