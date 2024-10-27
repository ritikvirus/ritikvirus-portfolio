import { Github } from '@icons/Github'
import HeatMap, { type SVGProps } from '@uiw/react-heat-map'
import Tooltip from '@uiw/react-tooltip'

import { formatDate, getDateSuffix } from '@/lib/utils'
import type { GithubContributionData } from '@/types'

import BentoBadge from './BentoBadge'

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

interface Props extends GithubContributionData {}

const BentoGithubActivity = (props: Props) => {
  return (
    <div className='relative flex h-full flex-col justify-between px-4 pb-5 pt-4 max-md:gap-4'>
      <div className='flex items-baseline justify-between'>
        <BentoBadge icon={Github} text='Github activity' />
        <p className='text-sm tracking-wider'>
          {props.totalContributions ?? 'No'} contributions in the last year
        </p>
      </div>
      <div className='w-full overflow-x-scroll'>
        <HeatMap
          {...getDateProps()}
          className='w-[550px]'
          value={props.contributions ?? []}
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
      {
        <p className='text-sm tracking-wider text-slate-200 max-sm:mt-4 max-sm:text-xs'>
          Last pushed on {formatDate(new Date(props.lastPushedAt))}
        </p>
      }
    </div>
  )
}

export default BentoGithubActivity
