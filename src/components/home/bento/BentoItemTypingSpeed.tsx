import { Timer } from '../../icons/Timer'
import { Target } from '../../icons/Target'
import { Translate } from '../../icons/Translate'
import BentoBadge from './BentoBadge'
import { Monkeytype } from '@/components/icons/Monkeytype'
import { cn } from '@/lib/utils'

const mockData: TypingDetailProps[] = [
  { icon: Timer, category: 'time', value: '30s' },
  { icon: Target, category: 'accuracy', value: '98%' },
  { icon: Translate, category: 'language', value: 'ID' }
]

interface TypingDetailProps {
  category: string
  value: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

const TypingDetail = ({ category, icon: Icon, value }: TypingDetailProps) => {
  return (
    // <div className='space-y-1.5 leading-none'>
    // <p className='text-xs capitalize text-slate-400'>{category}</p>
    <div className='flex items-center gap-1 tracking-wider text-slate-200'>
      <Icon className='size-4 text-slate-500 group-hover:text-slate-300' />
      <p>{value}</p>
    </div>
    // </div>
  )
}

const TypingSpeed = () => {
  return (
    <div className='relative flex h-full flex-col justify-between px-5 pb-6 pt-4 max-md:gap-12'>
      <p
        className={cn(
          'absolute text-[196px] font-extrabold text-transparent',
          'left-1/2 top-0 -z-10 -translate-x-1/2 leading-none opacity-70',
          'bg-gradient-to-b from-[#1E293B] to-[#11161D] bg-clip-text'
        )}
      >
        128
      </p>
      <BentoBadge
        icon={Monkeytype}
        text='Typing speed'
        className={{ component: 'w-fit' }}
      />
      <div className='space-y-2'>
        <div className='flex items-baseline gap-2'>
          <p className='text-[80px] font-medium leading-none'>128</p>
          <p className='text-2xl leading-none'>wpm</p>
        </div>
        <div className='flex gap-4'>
          {mockData.map((item) => (
            <TypingDetail key={item.category} {...item} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TypingSpeed
