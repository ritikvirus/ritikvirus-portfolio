import type { SVGProps } from 'react'

export function CloudTrail(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Cloud with trail dots */}
      <path fill='currentColor' opacity='.2' d='M9.5 18.5c-3.033 0-5.5-2.239-5.5-5s2.239-4.5 4.5-4.5c.246-2.42 2.168-4.5 4.75-4.5c2.757 0 5 2.243 5 5c2.209 0 4 1.791 4 4s-1.791 5-5 5z' />
      <circle cx='8' cy='20' r='1' fill='currentColor' />
      <circle cx='12' cy='21' r='1' fill='currentColor' />
      <circle cx='16' cy='22' r='1' fill='currentColor' />
    </svg>
  )
}
