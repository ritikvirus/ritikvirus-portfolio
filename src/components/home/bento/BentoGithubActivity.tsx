import HeatMap from '@uiw/react-heat-map'

import BentoCard from './BentoCard'
import type { GithubContributionData } from '@/types'
import { fetcher } from '@/lib/utils'
import useSWR from 'swr'

const value = [
  { date: '2016/01/11', count: 2 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2016/01/${idx + 10}`,
    count: idx
  })),
  ...[...Array(17)].map((_, idx) => ({
    date: `2016/02/${idx + 10}`,
    count: idx
  })),
  { date: '2016/04/12', count: 2 },
  { date: '2016/05/01', count: 5 },
  { date: '2016/05/02', count: 5 },
  { date: '2016/05/03', count: 1 },
  { date: '2016/05/04', count: 11 },
  { date: '2016/05/08', count: 32 }
]

const BentoGithubActivity = () => {
  // const { data, error } = useSWR<GithubContributionData>('/api/github', fetcher)

  return (
    <BentoCard className='flex h-full flex-col justify-between px-4 py-5'>
      <p className='mb-2 flex justify-end text-sm tracking-wider'>
        1,234 contributions
      </p>
      <div className='w-full overflow-x-scroll'>
        <HeatMap
          className='w-[110%]'
          value={value}
          weekLabels={false}
          monthLabels={false}
          legendCellSize={0}
          space={4}
          style={{ color: '#fff' }}
          startDate={new Date('2016/01/01')}
          rectProps={{ rx: 4 }}
          rectSize={16}
          rectRender={(props, data) => {
            return (
              // TODO: tooltip
              // <Tooltip content={`count`} side='top'>
              <rect {...props} />
              // </Tooltip>
            )
          }}
          panelColors={{
            0: '#1e293b',
            2: '#065f46',
            4: '#16a34a',
            10: '#4ade80',
            20: '#d9f99d',
            30: '#ea580c'
          }}
        />
      </div>
      <p className='text-sm tracking-wider'>
        Last commit on Monday, October 7th 2024
      </p>
    </BentoCard>
  )
}

export default BentoGithubActivity
