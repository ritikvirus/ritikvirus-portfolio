import React from 'react'
import BentoCard from './BentoCard'
import { HandWavingFill } from '@/components/icons/HandWavingFill'

const BentoItemContact = () => {
  return (
    <BentoCard className='flex h-full w-full flex-col justify-center space-y-2'>
      <HandWavingFill className='ml-2 size-[88px] text-slate-800' />
      <div className='space-y-4 px-5 font-medium tracking-wider'>
        <p className='text-lg leading-6'>Ready to bring your ideas to life?</p>
        <button className='cursor-pointer text-sm underline underline-offset-4'>
          Let's collaborate
        </button>
      </div>
    </BentoCard>
  )
}

export default BentoItemContact
