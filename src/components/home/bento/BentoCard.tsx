import React from 'react'
import { cn } from '@/lib/utils'

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const BentoCard = ({ children, className, ...rest }: Props) => {
  return (
    <div className={cn('card', className)} {...rest}>
      <div className={cn('card-content')}>{children}</div>
    </div>
  )
}

export default BentoCard
