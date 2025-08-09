import type { SVGProps } from 'react'

export function Runpod(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* minimal rocket */}
      <path d='M12 2l2 4-2 2-2-2 2-4Zm-2 7 2 2 2-2 5 2-4 4-3 3-3-3-4-4 5-2Z' fill='currentColor' />
    </svg>
  )
}
