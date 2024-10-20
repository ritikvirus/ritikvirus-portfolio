import { Timer } from '../../icons/Timer'
import { Target } from '../../icons/Target'
import { Translate } from '../../icons/Translate'
import BentoCard from './BentoCard'
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
    <div className='space-y-1.5 leading-none'>
      <p className='text-xs capitalize text-slate-400'>{category}</p>
      <div className='flex items-center gap-1 tracking-wider'>
        <Icon className='size-4 text-emerald-200' />
        <p>{value}</p>
      </div>
    </div>
  )
}

interface Props {
  className?: string
}

const TypingSpeed = (props: Props) => {
  return (
    <BentoCard {...props}>
      <div className='h-full place-content-end space-y-4 p-5'>
        <div className='flex items-baseline gap-2'>
          <p className='text-7xl font-medium leading-none'>128</p>
          <p>WPM</p>
        </div>
        <div className='flex justify-between'>
          {mockData.map((item) => (
            <TypingDetail key={item.category} {...item} />
          ))}
        </div>
      </div>
    </BentoCard>
  )
}

export default TypingSpeed
