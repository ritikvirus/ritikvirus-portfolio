// Tremor Tooltip [v0.0.2]

import './tooltip.css'

import * as TooltipPrimitives from '@radix-ui/react-tooltip'
import React from 'react'

import { cn } from '@/lib/utils'

import TooltipArrow from './tooltip-arrow'

interface TooltipProps
  extends Omit<TooltipPrimitives.TooltipContentProps, 'content' | 'onClick'>,
    Pick<
      TooltipPrimitives.TooltipProps,
      'open' | 'defaultOpen' | 'onOpenChange' | 'delayDuration'
    > {
  content: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  side?: 'bottom' | 'left' | 'top' | 'right'
  showArrow?: boolean
  triggerAsChild?: boolean
}

const Tooltip = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitives.Content>,
  TooltipProps
>(
  (
    {
      children,
      className,
      content,
      delayDuration,
      defaultOpen,
      open,
      onClick,
      onOpenChange,
      showArrow = true,
      side,
      sideOffset = 12,
      triggerAsChild = false,
      ...props
    }: TooltipProps,
    forwardedRef
  ) => {
    return (
      <TooltipPrimitives.Provider delayDuration={150}>
        <TooltipPrimitives.Root
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
          delayDuration={delayDuration}
          tremor-id='tremor-raw'
        >
          <TooltipPrimitives.Trigger onClick={onClick} asChild={triggerAsChild}>
            {children}
          </TooltipPrimitives.Trigger>
          <TooltipPrimitives.Portal>
            <TooltipPrimitives.Content
              ref={forwardedRef}
              side={side}
              sideOffset={sideOffset}
              align='center'
              className={cn(
                // base
                'max-w-60 select-none rounded-md px-3 py-2.5 text-sm leading-relaxed shadow-md',
                // text color
                'text-zinc-300/90',
                // background color
                'bg-[var(--tooltip-color)]',
                // transition
                'will-change-[transform,opacity]',
                'data-[side=bottom]:animate-slideDownAndFade data-[side=left]:animate-slideLeftAndFade data-[side=right]:animate-slideRightAndFade data-[side=top]:animate-slideUpAndFade data-[state=closed]:animate-hide',
                // other
                'z-50 border border-[var(--tooltip-border-color)]',
                'tooltip-content',
                className
              )}
              {...props}
            >
              {content}
              {showArrow && <TooltipArrow aria-hidden='true' />}
            </TooltipPrimitives.Content>
          </TooltipPrimitives.Portal>
        </TooltipPrimitives.Root>
      </TooltipPrimitives.Provider>
    )
  }
)

Tooltip.displayName = 'Tooltip'

export { Tooltip, type TooltipProps }
