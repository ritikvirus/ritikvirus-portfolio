import type { SVGProps } from 'react'

export function Kms(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Key icon with KMS label */}
      <path fill='currentColor' opacity='.2' d='M10 10a4 4 0 1 1-3.999 3.6L2 18v-2l2-2h2l.6-.6A4 4 0 0 1 10 10z' />
      <text x='16' y='8' textAnchor='middle' fontSize='5' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>KMS</text>
    </svg>
  )
}
