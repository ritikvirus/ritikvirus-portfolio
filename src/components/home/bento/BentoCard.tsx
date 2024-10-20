import React from 'react'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const BentoCard = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        // 'rounded-3xl border border-[#2e3e54] bg-[#11161D]',
        'card',
        className
      )}
      {...rest}
    >
      <div className={cn('card-content')}>{children}</div>
    </div>
  )
}

export default BentoCard
