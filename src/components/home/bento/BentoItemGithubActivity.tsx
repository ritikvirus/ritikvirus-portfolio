import useSWR from 'swr'

import HeatMap, { type SVGProps } from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

import { cn, fetcher, formatDate, getDateSuffix } from '@/lib/utils'
import type { GithubContributionData } from '@/types'

import BentoCard from './BentoCard'

const data: GithubContributionData = {
  lastPushedAt: Date.now(),
  totalContributions: 0,
  contributions: []
}

const getDateProps = () => {
  const today = new Date()
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(today.getMonth() - 6)

  return { startDate: sixMonthsAgo, endDate: today }
}

const renderRect: SVGProps['rectRender'] = (props, data) => {
  const date = new Date(data.date)
  const formattedDate =
    date.toLocaleDateString('en-US', { day: 'numeric', month: 'long' }) +
    getDateSuffix(date.getDate())

  return (
    <Tooltip
      placement='top'
      content={`${data.count || 'No'} contributions on ${formattedDate}`}
    >
      <rect {...props} />
    </Tooltip>
  )
}

interface Props {
  className?: string
}

const BentoGithubActivity = ({ className }: Props) => {
  // const { data, error } = useSWR<GithubContributionData>('/api/github', fetcher)

  return (
    <BentoCard
      className={cn(
        'flex h-full flex-col justify-between px-4 py-5',
        className
      )}
    >
      <p className='mb-2 flex justify-end text-sm tracking-wider'>
        {data?.totalContributions ?? 'No'} contributions in the last year
      </p>
      <div className='w-full overflow-x-scroll'>
        <HeatMap
          {...getDateProps()}
          className='w-[550px]'
          value={data?.contributions ?? []}
          weekLabels={false}
          monthLabels={false}
          legendCellSize={0}
          space={4}
          style={{ color: '#fff' }}
          rectProps={{ rx: 4 }}
          rectSize={16}
          rectRender={renderRect}
          panelColors={{
            1: '#1e293b',
            4: '#065f46',
            8: '#16a34a',
            12: '#4ade80',
            16: '#d9f99d',
            20: '#ea580c'
          }}
        />
      </div>
      {data?.lastPushedAt && (
        <p className='text-sm tracking-wider text-slate-200'>
          Last pushed on {formatDate(new Date(data.lastPushedAt))}
        </p>
      )}
    </BentoCard>
  )
}

export default BentoGithubActivity
