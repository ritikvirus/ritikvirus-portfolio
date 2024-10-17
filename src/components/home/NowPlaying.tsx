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

  return (
    <div
      className={cn(
        'flex h-full items-center gap-6 bg-[#11161D] p-4',
        props.className
      )}
    >
      {/* <img
        src={mockData.albumImageUrl}
        alt='Last Played Song Album Image'
        className='inline-block aspect-square h-full rounded-2xl bg-slate-400'
      /> */}
      <div className='inline-block aspect-square h-full rounded-2xl bg-slate-400'></div>
      <div className='space-y-2 tracking-widest'>
        <p className='text-xs uppercase text-neutral-400'>{mockData.artist}</p>
        <p className='font-medium tracking-wider'>{mockData.title}</p>
      </div>
    </div>
  )
}

export default NowPlaying
