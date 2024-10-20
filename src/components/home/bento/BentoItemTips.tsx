import { Search } from '@/components/icons/Search'
import BentoBadge from './BentoBadge'
import { Bulb } from '@/components/icons/Bulb'
import { cn } from '@/lib/utils'

const BentoItemTips = () => {
  return (
    <div className='relative h-full overflow-hidden'>
      <BentoBadge
        icon={Bulb}
        text='Tips'
        className={{ component: 'absolute right-2 top-2' }}
      />
      <Search
        className={cn(
          'absolute -bottom-2 left-2 size-[86px] rotate-[16deg] text-slate-800',
          'md:max-lg:left-auto md:max-lg:right-2 md:max-lg:-z-10 md:max-lg:size-40'
        )}
      />
      <div
        className={cn(
          'py-6 pl-[88px] tracking-wide',
          'md:max-lg:pl-6 md:max-lg:pt-8'
        )}
      >
        <p className='text-lg'>⌘+K</p>
        <p className='text-sm text-slate-400'>Find anything easily</p>
      </div>
    </div>
  )
}

export default BentoItemTips
