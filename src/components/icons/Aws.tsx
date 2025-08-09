import type { SVGProps } from 'react'

export function Aws(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* neutral cloud glyph */}
      <path
        fill='currentColor'
        d='M9.5 18.5c-3.033 0-5.5-2.239-5.5-5s2.239-4.5 4.5-4.5c.246-2.42 2.168-4.5 4.75-4.5c2.757 0 5 2.243 5 5c2.209 0 4 1.791 4 4s-1.791 5-5 5z'
        opacity='.2'
      />
      {/* AWS label */}
      <text x='12' y='14' textAnchor='middle' fontSize='6' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>AWS</text>
    </svg>
  )
}
