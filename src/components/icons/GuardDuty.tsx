import type { SVGProps } from 'react'

export function GuardDuty(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Shield with GD label */}
      <path fill='currentColor' opacity='.2' d='M12 2l8 4v5c0 5-3.5 8.5-8 11-4.5-2.5-8-6-8-11V6l8-4z' />
      <text x='12' y='13' textAnchor='middle' fontSize='6' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>GD</text>
    </svg>
  )
}
