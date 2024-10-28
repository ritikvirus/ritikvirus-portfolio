import { useRef } from 'react'

const OFFSET = 32
const NAV_BAR_HEIGHT = 58

const useScrollHandler = () => {
  const navRef = useRef<HTMLDivElement>(null)
  const navBottom = useRef(OFFSET)
  const previousScrollY = useRef(0)

  const handleScroll = () => {
    if (!navRef.current) return

    const currentScrollY = window.scrollY
    const deltaScroll = currentScrollY - previousScrollY.current

    // handle condition when initial scroll position != 0
    if (deltaScroll > NAV_BAR_HEIGHT && previousScrollY.current === 0) {
      return (previousScrollY.current = currentScrollY)
    }

    // scroll down
    if (deltaScroll > 0) {
      navBottom.current = Math.max(
        navBottom.current - deltaScroll,
        -(navRef.current.clientHeight || NAV_BAR_HEIGHT)
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
