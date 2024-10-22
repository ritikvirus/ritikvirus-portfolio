import { cn } from '@/lib/utils'

const PhotoItem = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'border-5 absolute aspect-square w-32 overflow-hidden rounded-2xl border-white shadow-lg',
        className
      )}
    >
      {/* TODO: optimize img */}
      <img
        // src='https://images.unsplash.com/photo-1728996152930-233c5aca21d7'
        src='https://images.unsplash.com/photo-1524666643752-b381eb00effb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZGV8ZW58MHx8MHx8fDA%3D'
        alt='TODO'
        className='h-full w-full object-cover'
      />
    </div>
  )
}

const photoCardsClassName = [
  {
    translate: '-translate-x-[64px] -translate-y-1.5',
    rotate: 'rotate-[-3deg]'
  },
  {
    translate:
      'translate-x-[0px] translate-y-[-4px] group-hover:translate-y-[-32px]',
    rotate: 'rotate-[-8deg] '
  },
  { translate: 'translate-x-[64px]', rotate: 'rotate-[2deg]' }
]

const TOTAL_PHOTO = 3

interface Props {
  className?: string
}

const PhotoCard = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'relative flex h-[180px] items-center justify-center',
        className
      )}
    >
      {Array.from({ length: TOTAL_PHOTO }).map((_, index) => {
        const { rotate, translate } = photoCardsClassName[index]
        return (
          <PhotoItem
            key={index}
            className={cn(rotate, translate, 'transition-all duration-300')}
          />
        )
      })}
    </div>
  )
}

export default PhotoCard
