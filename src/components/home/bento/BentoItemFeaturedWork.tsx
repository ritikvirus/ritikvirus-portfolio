import React from 'react'
import PhotoCard from '@/components/PhotoCard'

const BentoItemFeaturedWork = () => {
  return (
    <div className='flex h-full flex-col justify-end p-5 pb-6 tracking-wider'>
      <PhotoCard />
      <div className='space-y-2'>
        <p className='text-font-semibold text-lg leading-none'>Bookmarked</p>
        <p className='text-xs text-slate-400'>
          Effortlessly save and organize your favorite tweets in Notion.
        </p>
      </div>
    </div>
  )
}

export default BentoItemFeaturedWork
