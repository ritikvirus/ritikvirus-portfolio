import React from 'react'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

const BentoCard = (props: Props) => {
  const { children, className, hoverable = true, ...rest } = props

  if (hoverable) {
    return (
      <div className={cn('card group rounded-3xl', className)} {...rest}>
        <div className={cn('card-content md:absolute')}>{children}</div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'rounded-3xl border border-[#1f2b3a] bg-[#11161D]',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export default BentoCard
