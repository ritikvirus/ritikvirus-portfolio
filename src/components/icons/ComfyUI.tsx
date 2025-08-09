import type { SVGProps } from 'react'

export function ComfyUI(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* Simple nodes-and-edges glyph */}
      <circle cx='6' cy='12' r='2' fill='currentColor' />
      <circle cx='12' cy='6' r='2' fill='currentColor' />
      <circle cx='18' cy='12' r='2' fill='currentColor' />
      <circle cx='12' cy='18' r='2' fill='currentColor' />
      <path d='M7.7 10.7L10.3 8.1M13.7 8.1l2.6 2.6M7.7 13.3l2.6 2.6M13.7 15.9l2.6-2.6' stroke='currentColor' strokeWidth='1.5' fill='none' />
    </svg>
  )
}
