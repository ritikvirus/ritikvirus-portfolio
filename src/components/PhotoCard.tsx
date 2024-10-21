import { cn } from '@/lib/utils'

const PhotoItem = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'absolute aspect-square w-40 overflow-hidden rounded-xl border-4 border-white shadow-lg',
        className
      )}
    >
      {/* TODO: optimize img */}
      <img
        // src='https://images.unsplash.com/photo-1728996152930-233c5aca21d7'
        src='https://images.unsplash.com/photo-1524666643752-b381eb00effb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNvZGV8ZW58MHx8MHx8fDA%3D'
        alt='TODO'
        width={80}
        height={80}
        className='h-full w-full object-cover'
      />
    </div>
  )
}

const photoCardsClassName = [
  {
    translate: 'translate-x-[-96px] -translate-y-1.5',
    rotate: 'rotate-[-3deg]'
  },
  {
    translate: 'translate-x-[0px] translate-y-[-4px]',
    rotate: 'rotate-[-8deg]'
  },
  { translate: 'translate-x-[96px]', rotate: 'rotate-[2deg]' }
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
        return <PhotoItem key={index} className={cn(rotate, translate)} />
      })}
    </div>
  )
}

export default PhotoCard
