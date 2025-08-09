import type { SVGProps } from 'react'

export function Zap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Fallback lightning bolt with ZAP label */}
      <path fill='currentColor' d='M13 2L3 14h6l-2 8 10-12h-6l2-8z' opacity='.9' />
    </svg>
  )
}
