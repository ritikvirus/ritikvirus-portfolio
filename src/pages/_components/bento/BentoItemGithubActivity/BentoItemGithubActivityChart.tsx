import { Github } from '@icons/Github'
import HeatMap, { type SVGProps } from '@uiw/react-heat-map'

import { formatDate, getDateSuffix } from '@/lib/utils'
import type { GithubContributionData } from '@/types'

import BentoBadge from '../BentoBadge'

const getDateProps = () => {
  const today = new Date()
  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(today.getMonth() - 6)

  return { startDate: sixMonthsAgo, endDate: today }
}

interface Props extends GithubContributionData {}

const BentoGithubActivity = (props: Props) => {
  return (
    <div className='relative flex h-full flex-col justify-between px-4 pb-5 pt-4 max-md:gap-4'>
      <div className='flex items-baseline justify-between gap-4 max-xs:flex-col'>
        <BentoBadge icon={Github} text='Github activity' />
        <p className='line-clamp-1 text-sm'>
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
          // rectRender={renderRect}
          panelColors={{
            1: '#19222F',
            4: '#0F4E43',
            8: '#1F977B',
            12: '#1EF4AE'
          }}
        />
      </div>
      {
        <p className='text-sm text-slate-200 max-sm:text-xs sm:max-lg:mt-4'>
          Last pushed on {formatDate(new Date(props.lastPushedAt))}
        </p>
      }
    </div>
  )
}

export default BentoGithubActivity
