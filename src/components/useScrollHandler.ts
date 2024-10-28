import { useRef } from 'react'

const OFFSET = 32

const useScrollHandler = () => {
  const navRef = useRef<HTMLDivElement>(null)
  const navBottom = useRef(0)
  const previousScrollY = useRef(0)

  const handleScroll = () => {
    if (!navRef.current) return

    const currentScrollY = window.scrollY
    const deltaScroll = currentScrollY - previousScrollY.current

    if (deltaScroll > 0) {
      navBottom.current = Math.max(
        navBottom.current - deltaScroll,
        -navRef.current.clientHeight
      )
    } else {
      navBottom.current = Math.min(navBottom.current - deltaScroll, OFFSET)
    }

    navRef.current.style.bottom = `${navBottom.current}px`

    previousScrollY.current = currentScrollY
  }

  return { handleScroll, navRef }
}

export default useScrollHandler
