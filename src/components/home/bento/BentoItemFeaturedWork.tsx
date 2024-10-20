import PhotoCard from '@/components/PhotoCard'
import BentoBadge from './BentoBadge'
import { Suitcase } from '@/components/icons/Suitcase'

const BentoItemFeaturedWork = () => {
  return (
    <div className='relative flex h-full flex-col justify-end p-5 pb-6 tracking-wider max-sm:pt-10'>
      <BentoBadge
        icon={Suitcase}
        text='Featured work'
        className={{ component: 'absolute left-2 top-2' }}
      />
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
