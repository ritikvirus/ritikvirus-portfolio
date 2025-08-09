import type { SVGProps } from 'react'

export function Nikto(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Terminal window with NK */}
      <rect x='3' y='6' width='18' height='12' rx='2' fill='currentColor' opacity='.2' />
      <text x='12' y='14' textAnchor='middle' fontSize='6' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>NK</text>
    </svg>
  )
}
