import {useEffect, useCallback} from 'react'

import debounce from 'lodash.debounce'

import {useDocumentsStore} from '../App/stores'

const useScrollPos = loading => {
  const scrollPos = useDocumentsStore(state => state.scrollIndex)
  const setScrollPos = useDocumentsStore(state => state.setScrollIndex)
  const handleScroll = useCallback(() => {
    if (!loading && window.scrollY !== 0) {
      setScrollPos(window.scrollY)
      console.log(`updated scroll pos ${window.scrollY}`)
    }
  }, [setScrollPos, loading])

  useEffect(() => {
    window.addEventListener('scroll', debounce(handleScroll, 500))
    return () =>
      window.removeEventListener('scroll', debounce(handleScroll, 500))
  }, [handleScroll])

  useEffect(() => {
    window.scrollTo(0, scrollPos)
  }, [scrollPos, loading])
}

export default useScrollPos
