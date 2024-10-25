import { Monkeytype } from '@icons/Monkeytype'
import { Target } from '@icons/Target'
import { Timer } from '@icons/Timer'
import { Translate } from '@icons/Translate'
import useSWRImmutable from 'swr/immutable'

import client from '@/lib/client'
import { cn, fetcher } from '@/lib/utils'
import type { MonkeyTypeData, MonkeyTypeLanguage } from '@/types'

import BentoBadge from './BentoBadge'

const mapTypingDetailData = (data: MonkeyTypeData) => {
  const LANGUAGE: Record<MonkeyTypeLanguage, string> = {
    english: 'EN',
    indonesian: 'ID'
  }
  return [
    { icon: Timer, category: 'time', value: `${data.time}s` },
    { icon: Target, category: 'accuracy', value: `${data.acc}%` },
    { icon: Translate, category: 'language', value: LANGUAGE[data.language] }
  ]
}

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
  const { data, error } = useSWRImmutable(
    'monkeytype',
    fetcher(client.api.monkeytype.$get())
  )

  // if (error) return

  return (
    <div className='relative flex h-full flex-col justify-between px-5 pb-6 pt-4 max-md:gap-12'>
      <p
        className={cn(
          'absolute text-[196px] font-extrabold text-transparent',
          'left-1/2 top-0 -z-10 -translate-x-1/2 leading-none opacity-70',
          'bg-gradient-to-b from-[#1E293B] to-[#11161D] bg-clip-text'
        )}
      >
        {data?.wpm}
      </p>
      <BentoBadge
        icon={Monkeytype}
        text='Typing speed'
        className={{ component: 'w-fit' }}
      />
      <div className='space-y-2'>
        <div className='flex items-baseline gap-2'>
          <p className='text-[80px] font-medium leading-none'>{data?.wpm}</p>
          <p className='text-2xl leading-none'>wpm</p>
        </div>
        <div className='flex gap-4'>
          {data &&
            mapTypingDetailData(data).map((item) => (
              <TypingDetail key={item.category} {...item} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default TypingSpeed
