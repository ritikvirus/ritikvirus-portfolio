import type { SVGProps } from 'react'

export function Waf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Brick wall blocks with WAF label */}
      <rect x='3' y='6' width='6' height='4' fill='currentColor' opacity='.2' />
      <rect x='11' y='6' width='10' height='4' fill='currentColor' opacity='.2' />
      <rect x='3' y='12' width='10' height='4' fill='currentColor' opacity='.2' />
      <rect x='15' y='12' width='6' height='4' fill='currentColor' opacity='.2' />
      <text x='12' y='20' textAnchor='middle' fontSize='5' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>WAF</text>
    </svg>
  )
}
