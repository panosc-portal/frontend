import {useEffect, useCallback} from 'react'

import debounce from 'lodash.debounce'

import {useDocumentsStore} from '../App/stores'

const useScrollPos = loading => {
  const scrollPos = useDocumentsStore(state => state.scrollIndex)
  const setScrollPos = useDocumentsStore(state => state.setScrollIndex)
  const handleScroll = useCallback(() => {
    if (!loading && window.scrollY !== 0) {
      setScrollPos(window.scrollY)
    }
  }, [setScrollPos, loading])
  const handler = debounce(handleScroll, 500)

  useEffect(() => {
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [handleScroll, handler])

  useEffect(() => {
    window.scrollTo(0, scrollPos)
  }, [scrollPos, loading])
}

export default useScrollPos
