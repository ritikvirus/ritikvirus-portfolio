import type { SVGProps } from 'react'
import { siWhatsapp } from 'simple-icons'

export default function WhatsApp(props: Readonly<SVGProps<SVGSVGElement>>) {
  return (
    <svg
      aria-hidden='true'
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      role='img'
      {...props}
    >
  <path fill='currentColor' d={siWhatsapp.path} />
    </svg>
  )
}
