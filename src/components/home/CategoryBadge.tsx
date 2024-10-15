import { type SVGProps } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
  text: string
}

const CategoryBadge = ({ className, icon: Icon, text }: Props) => {
  return (
    <div
      className={cn(
        'z-10 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950 px-2 py-1',
        className
      )}
    >
      <Icon className='size-3' />
      <h3 className='text-xs font-medium tracking-wide text-slate-200'>
        {text}
      </h3>
    </div>
  )
}

export default CategoryBadge
