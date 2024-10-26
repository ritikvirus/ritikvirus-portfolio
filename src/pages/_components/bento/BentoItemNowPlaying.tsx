import { Spotify } from '@icons/Spotify'
import useSWRImmutable from 'swr/immutable'

import client from '@/lib/client'
import { cn, fetcher } from '@/lib/utils'

import BentoBadge from './BentoBadge'

interface Props {
  className?: string
}

const BentoItemNowPlaying = ({ className }: Props) => {
  // TODO
  const { data, error } = useSWRImmutable(
    'spotify',
    fetcher(client.api.spotify.$get())
  )

  if (error) return <p>error</p>

  return (
    <a
      href={data?.songUrl}
      target='_blank'
      className={cn(
        'group relative flex h-full items-center gap-x-6 p-5',
        'max-lg:p-6 md:max-lg:flex-col md:max-lg:items-start md:max-lg:justify-between'
      )}
    >
      <BentoBadge
        icon={Spotify}
        className={{
          component: 'absolute right-3 top-3',
          icon: 'transition-all duration-300 group-hover:text-green-400'
        }}
      />
      <div className='aspect-square h-full rounded-xl bg-black p-3 max-lg:h-3/5 max-md:min-w-24'>
        <div className='relative'>
          <img
            src={data?.albumImageUrl}
            alt='Last Played Song'
            className={cn('absolute rounded-full', {
              'animate-[spin_5s_linear_infinite]': data?.isPlaying
            })}
          />
        </div>
      </div>
      <div className='w-full space-y-1 overflow-hidden tracking-wider'>
        <p className='text-sm tracking-wide text-slate-400'>
          {data?.isPlaying ? 'Now playing' : 'Last played'}
        </p>
        <div className='items-center gap-x-4 space-y-1 md:max-lg:flex'>
          <p className='block text-ellipsis whitespace-nowrap font-medium lg:overflow-hidden'>
            {data?.title}
          </p>
          <p className='block overflow-hidden text-ellipsis whitespace-nowrap text-sm uppercase text-slate-400'>
            {data?.artist}
          </p>
        </div>
      </div>
    </a>
  )
}

export default BentoItemNowPlaying
