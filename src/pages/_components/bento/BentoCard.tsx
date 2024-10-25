import React from 'react'

import { cn } from '@/lib/utils'

interface Link {
  href: string
  target?: string
}

interface Props {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
  link?: Link
}

const BentoCard = (props: Props) => {
  const { children, className, hoverable = true, ...rest } = props

  const Comp = props.link ? 'a' : 'div'
  const restProps = { ...rest, ...props.link }

  if (hoverable) {
    return (
      <Comp className={cn('card group rounded-3xl', className)} {...restProps}>
        <div
          className={cn(
            'card-content md:absolute',
            'border-[#1f2b3a] max-md:border'
          )}
        >
          {children}
        </div>
      </Comp>
    )
  }

  return (
    <Comp
      className={cn(
        'rounded-3xl border border-[#1f2b3a] bg-[#11161D]',
        className
      )}
      {...restProps}
    >
      {children}
    </Comp>
  )
}

export default BentoCard
