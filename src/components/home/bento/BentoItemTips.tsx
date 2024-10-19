import React from 'react'

import BentoCard from './BentoCard'
import { Search } from '@/components/icons/Search'

const BentoItemTips = () => {
  return (
    <BentoCard className='relative h-full w-full overflow-hidden'>
      <Search className='absolute -bottom-2 left-2 size-[86px] rotate-[16deg] text-slate-800' />
      <div className='pl-[88px] pt-6'>
        <p className='text-lg'>⌘+K</p>
        <p className='text-sm text-slate-400'>Find anything easily</p>
      </div>
    </BentoCard>
  )
}

export default BentoItemTips
