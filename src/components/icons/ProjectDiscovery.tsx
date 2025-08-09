import type { SVGProps } from 'react'

export function ProjectDiscovery(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Fallback hexagon with PD label */}
      <path
        fill='currentColor'
        opacity='.2'
        d='M12 2l7 4v8l-7 4-7-4V6l7-4z'
      />
      <text x='12' y='14' textAnchor='middle' fontSize='6' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>PD</text>
    </svg>
  )
}
