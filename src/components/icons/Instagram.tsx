import type { SVGProps } from 'react'

export function Instagram(props: Readonly<SVGProps<SVGSVGElement>>) {
  // Simple outline Instagram glyph (rounded square + circle + corner dot)
  return (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      {...props}
    >
      <rect
        x='3'
        y='3'
        width='18'
        height='18'
        rx='5'
        ry='5'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle
        cx='12'
        cy='12'
        r='4'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
      />
      <circle cx='17.5' cy='6.5' r='1' fill='currentColor' />
    </svg>
  )
}
