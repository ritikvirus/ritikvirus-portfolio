import { Search } from '@/components/icons/Search'

const BentoItemTips = () => {
  return (
    <div className='relative h-full overflow-hidden'>
      <Search className='absolute -bottom-2 left-2 size-[86px] rotate-[16deg] text-slate-800' />
      <div className='pl-[88px] pt-6 tracking-wide'>
        <p className='text-lg'>⌘+K</p>
        <p className='text-sm text-slate-400'>Find anything easily</p>
      </div>
    </div>
  )
}

export default BentoItemTips
