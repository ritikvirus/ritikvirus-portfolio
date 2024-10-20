import { fetcher } from '@/lib/utils'
import type { SpotifyData } from '@/types'
import useSWR from 'swr'
import BentoBadge from './BentoBadge'
import { Spotify } from '@/components/icons/Spotify'

const mockData: SpotifyData = {
  albumImageUrl:
    'https://i.scdn.co/image/ab67616d0000b273cefa9ff31f38a09caf2db670',
  artist: 'Hillsong Young & Free, TAYA',
  isPlaying: false,
  songUrl: 'https://open.spotify.com/track/1glJZF62bpxXzaF2N5YWdb',
  title: 'Wake (Studio)'
}

const BentoItemNowPlaying = () => {
  // const { data, error } = useSWR<SpotifyData>('/api/spotify', fetcher)

  return (
    <div className='relative flex h-full items-center gap-6 p-3'>
      <BentoBadge
        icon={Spotify}
        className={{ component: 'absolute right-2 top-2' }}
      />
      <div className='relative aspect-square h-full'>
        <img
          src={mockData.albumImageUrl}
          alt='Last Played Song'
          className='absolute rounded-xl'
        />
      </div>
      <div className='space-y-2 overflow-hidden tracking-wider'>
        <p className='block overflow-hidden text-ellipsis whitespace-nowrap pr-12 text-xs uppercase text-neutral-400'>
          {mockData.artist}
        </p>
        <p className='block overflow-hidden text-ellipsis whitespace-nowrap font-medium'>
          {mockData.title}
        </p>
      </div>
    </div>
  )
}

export default BentoItemNowPlaying
