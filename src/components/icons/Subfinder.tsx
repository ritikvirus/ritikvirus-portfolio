import type { SVGProps } from 'react'

export function Subfinder(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Magnifier with SF */}
      <circle cx='10' cy='10' r='6' stroke='currentColor' strokeWidth='1' fill='none' />
      <line x1='14' y1='14' x2='20' y2='20' stroke='currentColor' strokeWidth='1' />
      <text x='10' y='11' textAnchor='middle' fontSize='5' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>SF</text>
    </svg>
  )
}
