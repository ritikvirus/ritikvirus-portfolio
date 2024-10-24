import { cn, fetcher } from '@/lib/utils'
import useSWR from 'swr'
import BentoBadge from './BentoBadge'
import { Spotify } from '@/components/icons/Spotify'
import client from '@/lib/client'

const BentoItemNowPlaying = () => {
  const { data, error } = useSWR('spotify', fetcher(client.api.spotify.$get()))

  if (error) return

  return (
    <div
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
            className={cn(
              'absolute rounded-full',
              'group-hover:animate-[spin_5s_linear_infinite]'
            )}
          />
        </div>
      </div>
      <div className='w-full space-y-1.5 overflow-hidden tracking-wider'>
        <p className='text-xs tracking-wide text-slate-400'>
          {data?.isPlaying ? 'Now playing' : 'Last played'}
        </p>
        <div className='items-center gap-x-4 space-y-1.5 md:max-lg:flex'>
          <p className='block text-ellipsis whitespace-nowrap font-medium lg:overflow-hidden'>
            {data?.title}
          </p>
          <p className='block overflow-hidden text-ellipsis whitespace-nowrap text-xs uppercase text-slate-400'>
            {data?.artist}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BentoItemNowPlaying
