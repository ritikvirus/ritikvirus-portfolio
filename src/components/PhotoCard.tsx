import { cn } from '@/lib/utils'
import React from 'react'

const PhotoItem = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'absolute aspect-square w-20 overflow-hidden rounded-xl border-4 border-white shadow-lg',
        className
      )}
    >
      <img
        src='https://images.unsplash.com/photo-1728996152930-233c5aca21d7'
        alt='TODO'
        className='h-full w-full object-cover'
      />
    </div>
  )
}

const photoCardsClassName = [
  {
    translate: 'translate-x-[-48px] -translate-y-1.5',
    rotate: 'rotate-[-3deg]'
  },
  {
    translate: 'translate-x-[0px] translate-y-[-4px]',
    rotate: 'rotate-[-8deg]'
  },
  { translate: 'translate-x-[48px]', rotate: 'rotate-[2deg]' }
]

const TOTAL_PHOTO = 3

const PhotoCard = () => {
  return (
    <div className='relative flex h-[120px] items-center justify-center'>
      {Array.from({ length: TOTAL_PHOTO }).map((_, index) => {
        const { rotate, translate } = photoCardsClassName[index]
        return <PhotoItem key={index} className={cn(rotate, translate)} />
      })}
    </div>
  )
}

export default PhotoCard
