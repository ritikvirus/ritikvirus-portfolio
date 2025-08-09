import type { SVGProps } from 'react'

export function SecretsManager(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Lock icon with SM label */}
      <rect x='6' y='10' width='12' height='8' rx='2' fill='currentColor' opacity='.2' />
      <path d='M9 10V8a3 3 0 1 1 6 0v2' stroke='currentColor' strokeWidth='1' fill='none' />
      <text x='12' y='17' textAnchor='middle' fontSize='5' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>SM</text>
    </svg>
  )
}
