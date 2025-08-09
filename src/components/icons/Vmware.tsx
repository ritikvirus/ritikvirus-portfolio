import type { SVGProps } from 'react'
import { siVmware } from 'simple-icons'

export function Vmware(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      <path fill='currentColor' d={siVmware.path} />
    </svg>
  )
}
