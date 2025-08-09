import type { SVGProps } from 'react'

export function Boto3(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Simple AWS SDK leaf-like mark with B3 label */}
      <path fill='currentColor' opacity='.2' d='M12 2c2 2 6 3 6 7s-4 9-6 13c-2-4-6-9-6-13s4-5 6-7z' />
      <text x='12' y='13' textAnchor='middle' fontSize='6' fontFamily='ui-sans-serif, system-ui' fill='currentColor'>B3</text>
    </svg>
  )
}
