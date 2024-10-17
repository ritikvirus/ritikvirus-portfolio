import { cn, fetcher } from '@/lib/utils'
import type { SpotifyData } from '@/types'
import useSWR from 'swr'

const mockData: SpotifyData = {
  albumImageUrl:
    'https://i.scdn.co/image/ab67616d0000b273cefa9ff31f38a09caf2db670',
  artist: 'Hillsong Young & Free, TAYA',
  isPlaying: false,
  songUrl: 'https://open.spotify.com/track/1glJZF62bpxXzaF2N5YWdb',
  title: 'Wake (Studio)'
}

interface Props {
  className?: string
}

const NowPlaying = (props: Props) => {
  // const { data, error } = useSWR<SpotifyData>('/api/spotify', fetcher)

  // return (
  //   <img
  //     src={mockData.albumImageUrl}
  //     alt='Last Played Song Album Image'
  //     className='h-full w-auto rounded-xl object-cover'
  //   />
  // )

  return (
    <div
      className={cn(
        'flex h-full items-center gap-6 bg-[#11161D] p-3',
        props.className
      )}
    >
      <div className='relative aspect-square h-full'>
        <img
          src={mockData.albumImageUrl}
          alt='Last Played Song Album Image'
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

export default NowPlaying
