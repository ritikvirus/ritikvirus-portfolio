import React from 'react'

import BentoCard from './BentoCard'
import { Search } from '@/components/icons/Search'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

const BentoItemTips = ({ className }: Props) => {
  return (
    <BentoCard
      className={cn('relative h-full w-full overflow-hidden', className)}
    >
      <Search className='absolute -bottom-2 left-2 size-[86px] rotate-[16deg] text-slate-800' />
      <div className='pl-[88px] pt-6 tracking-wide'>
        <p className='text-lg'>⌘+K</p>
        <p className='text-sm text-slate-400'>Find anything easily</p>
      </div>
    </BentoCard>
  )
}

export default BentoItemTips
