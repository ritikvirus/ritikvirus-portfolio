import type { SVGProps } from 'react'

export function Lora(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      {/* LoRA concept: matrix circle with weights */}
      <circle cx='12' cy='12' r='9' fill='currentColor' opacity='.1' />
      <circle cx='9' cy='10' r='1' fill='currentColor' />
      <circle cx='15' cy='10' r='1' fill='currentColor' />
      <circle cx='12' cy='14' r='1' fill='currentColor' />
      <path d='M9 10h6M9 10l3 4m3-4l-3 4' stroke='currentColor' strokeWidth='1' fill='none' />
    </svg>
  )
}
