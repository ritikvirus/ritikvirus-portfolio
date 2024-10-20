import BentoCard from './BentoCard'
import { HandWavingFill } from '@/components/icons/HandWavingFill'
import { ArrowOutward } from '@/components/icons/ArrowOutward'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

const BentoItemContact = ({ className }: Props) => {
  return (
    <BentoCard
      className={cn(
        'flex h-full w-full flex-col justify-center space-y-2',
        className
      )}
    >
      <HandWavingFill className='ml-2 size-[88px] text-slate-800' />
      <div className='space-y-4 px-5 font-medium tracking-wider'>
        <p className='text-md leading-6'>Ready to bring your ideas to life?</p>
        <button className='flex cursor-pointer items-center gap-0.5 border-b border-white'>
          <span className='text-sm'>Let's collaborate</span>
          <ArrowOutward className='size-4' />
        </button>
      </div>
    </BentoCard>
  )
}

export default BentoItemContact
