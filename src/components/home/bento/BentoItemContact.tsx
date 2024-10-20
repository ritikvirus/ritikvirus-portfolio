import { HandWavingFill } from '@/components/icons/HandWavingFill'
import { ArrowOutward } from '@/components/icons/ArrowOutward'
import BentoBadge from './BentoBadge'
import { HandTap } from '@/components/icons/HandTap'

const BentoItemContact = () => {
  return (
    <div className='relative flex h-full w-full flex-col justify-center space-y-2 max-md:h-48 max-md:pb-6'>
      <BentoBadge
        icon={HandTap}
        text='Contact'
        className={{ component: 'absolute right-2 top-2' }}
      />
      <HandWavingFill className='ml-2 size-[88px] text-slate-800' />
      <div className='space-y-4 px-5 tracking-wider'>
        <p className='text-lg leading-6'>Ready to bring ideas to life?</p>
        <button className='flex cursor-pointer items-center gap-0.5 border-b border-white'>
          <span className='text-sm font-medium'>Let's collaborate</span>
          <ArrowOutward className='size-4' />
        </button>
      </div>
    </div>
  )
}

export default BentoItemContact
