import {useEffect, useCallback} from 'react'

import debounce from 'lodash.debounce'

import {useDocumentsStore} from '../App/stores'

const useScrollPosition = loading => {
  const scrollPosition = useDocumentsStore(state => state.scrollIndex)
  const setScrollPosition = useDocumentsStore(state => state.setScrollIndex)
  const handleScroll = useCallback(() => {
    if (!loading && window.scrollY !== 0) {
      setScrollPosition(window.scrollY)
    }
  }, [setScrollPosition, loading])
  const handler = debounce(handleScroll, 500)

  useEffect(() => {
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [handleScroll, handler])

  useEffect(() => {
    window.scrollTo(0, scrollPosition)
  }, [scrollPosition, loading])
}

export default useScrollPosition
