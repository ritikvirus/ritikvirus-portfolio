import PhotoCard from '@/components/PhotoCard'
import BentoBadge from './BentoBadge'
import { Suitcase } from '@/components/icons/Suitcase'
import { cn } from '@/lib/utils'

const BentoItemFeaturedWork = () => {
  return (
    <div
      className={cn(
        'relative flex h-full flex-col gap-3 overflow-hidden px-5 pb-8 pt-4 tracking-wider',
        'max-xs:pb-36 md:max-lg:gap-4'
      )}
    >
      <PhotoCard
        className={cn(
          'absolute -bottom-12 md:left-1/2',
          'lg:max-[1108px]:-bottom-16',
          'max-xs:left-1/2 xs:max-lg:right-1/4 xs:max-sm:scale-95'
        )}
      />
      <div className='space-y-5'>
        <BentoBadge
          icon={Suitcase}
          text='Featured work'
          className={{ component: 'w-fit' }}
        />
        <div className='space-y-3 xs:max-md:w-1/2'>
          <p className='text-font-semibold text-xl leading-none'>Bookmarked</p>
          <p className='text-xs text-slate-400'>
            Effortlessly save and organize your favorite tweets in Notion
            through Telegram bot.
          </p>
        </div>
      </div>
    </div>
  )
}

export default BentoItemFeaturedWork
