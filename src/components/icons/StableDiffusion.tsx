import type { SVGProps } from 'react'

export function StableDiffusion(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* simple spiral-like swirl */}
      <path d='M12 4c4.418 0 8 2.686 8 6 0 2.21-1.79 4-4 4-1.657 0-3-1.12-3-2.5S14 9 15.5 9c1.381 0 2.5 1.12 2.5 2.5' stroke='currentColor' strokeWidth='1.5' fill='none' />
      <path d='M12 20c-4.418 0-8-2.686-8-6 0-2.21 1.79-4 4-4 1.657 0 3 1.12 3 2.5S10 15 8.5 15C7.12 15 6 13.88 6 12.5' stroke='currentColor' strokeWidth='1.5' fill='none' />
    </svg>
  )
}
