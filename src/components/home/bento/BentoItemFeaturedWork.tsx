import React from 'react'
import BentoCard from './BentoCard'
import PhotoCard from '@/components/PhotoCard'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const BentoItemFeaturedWork = ({ className, ...rest }: Props) => {
  return (
    <BentoCard
      className={cn(
        'flex h-full flex-col justify-end p-5 pb-6 tracking-wider',
        className
      )}
      {...rest}
    >
      <PhotoCard />
      <div className='space-y-2'>
        <p className='text-font-semibold text-lg leading-none'>Bookmarked</p>
        <p className='text-xs text-slate-400'>
          Effortlessly save and organize your favorite tweets in Notion.
        </p>
      </div>
    </BentoCard>
  )
}

export default BentoItemFeaturedWork
