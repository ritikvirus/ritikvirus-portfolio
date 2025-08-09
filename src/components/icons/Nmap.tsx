import type { SVGProps } from 'react'

export function Nmap(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Radar circle with NM */}
      <circle cx='12' cy='12' r='8' stroke='currentColor' strokeWidth='1' fill='none' />
      <path d='M12 12L18 10' stroke='currentColor' strokeWidth='1' />
      <circle cx='18' cy='10' r='1' fill='currentColor' />
      <text x='12' y='22' textAnchor='middle' fontSize='5' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>NM</text>
    </svg>
  )
}
