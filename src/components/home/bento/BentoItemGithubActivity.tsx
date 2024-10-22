import useSWR from 'swr'

import HeatMap, { type SVGProps } from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

import { fetcher, formatDate, getDateSuffix } from '@/lib/utils'
import type { GithubContributionData } from '@/types'
import BentoBadge from './BentoBadge'
import { Github } from '@/components/icons/Github'

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

const BentoGithubActivity = () => {
  const { data, error } = useSWR<GithubContributionData>('/api/github', fetcher)

  if (error) return

  return (
    <div className='relative flex h-full flex-col justify-between px-4 py-5 max-xs:pt-12'>
      <BentoBadge
        icon={Github}
        text='Github activity'
        className={{ component: 'absolute left-2 top-2' }}
      />
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
            1: '#19222F',
            4: '#0F4E43',
            8: '#1F977B',
            12: '#1EF4AE'
          }}
        />
      </div>
      {data?.lastPushedAt && (
        <p className='text-sm tracking-wider text-slate-200 max-sm:mt-4 max-sm:text-xs'>
          Last pushed on {formatDate(new Date(data.lastPushedAt))}
        </p>
      )}
    </div>
  )
}

export default BentoGithubActivity
