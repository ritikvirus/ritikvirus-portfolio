import React from 'react'

import { Tooltip } from '@/components/ui/tooltip'

interface Props {
  children: React.ReactNode
  wordsCount: number
  linkColor?: string
}

const ReadingTimeTooltip = ({ wordsCount, children, linkColor }: Props) => {
  return (
    <Tooltip
      content={
        <p>
          This <i>{wordsCount}-word</i> article is based on a 200{' '}
          <a
            href='https://en.wikipedia.org/wiki/Words_per_minute'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:underline'
            style={{ color: linkColor }}
          >
            WPM
          </a>{' '}
          reading speed.
        </p>
      }
    >
      {children}
    </Tooltip>
  )
}

export default ReadingTimeTooltip
