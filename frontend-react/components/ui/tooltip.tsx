'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'
import { HelpIconDesktop, TrashIcon } from '@/components/assets/icons'
import { HelpIconMobi } from '@/components/assets/iconsMobi'

interface HelpTooltipProps {
    tooltipMessage: string
    className?: string
}

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger
const PopoverContent = React.forwardRef<
    React.ElementRef<typeof PopoverPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(
    (
        {
            className,
            align = 'start',
            side = 'top',
            sideOffset = 4,
            alignOffset = 50,
            avoidCollisions,
            collisionBoundary,
            arrowPadding,
            collisionPadding,
            ...props
        },
        ref,
    ) => (
        <PopoverPrimitive.Portal>
            <PopoverPrimitive.Content
                ref={ref}
                align={align}
                side={side}
                sideOffset={sideOffset}
                alignOffset={alignOffset}
                arrowPadding={arrowPadding}
                avoidCollisions={avoidCollisions}
                collisionPadding={collisionPadding}
                collisionBoundary={collisionBoundary}
                className={cn(
                    'z-50 w-72 rounded-md bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                    className,
                )}
                {...props}
            ></PopoverPrimitive.Content>
        </PopoverPrimitive.Portal>
    ),
)
PopoverContent.displayName = PopoverPrimitive.Content.displayName
const PopoverArrow = PopoverPrimitive.Arrow

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(
    (
        {
            className,
            align = 'start',
            side = 'top',
            sideOffset = 4,
            alignOffset = 50,
            avoidCollisions,
            arrowPadding,
            collisionPadding,
            ...props
        },
        ref,
    ) => (
        <TooltipPrimitive.Content
            ref={ref}
            align={align}
            side={side}
            sideOffset={sideOffset}
            alignOffset={alignOffset}
            arrowPadding={arrowPadding}
            avoidCollisions={avoidCollisions}
            collisionPadding={collisionPadding}
            className={cn(
                'z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
                className,
            )}
            {...props}
        />
    ),
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName
const TooltipArrow = TooltipPrimitive.Arrow

export const HelpTooltipDesktop: React.FC<HelpTooltipProps> = ({ tooltipMessage }) => (
    <TooltipProvider delayDuration={200}>
        <Tooltip>
            <TooltipTrigger asChild>
                <button className="flex justify-self-start self-end mt-5 mr-6 3xl:mr-5 2xl:mr-6">
                    <HelpIconDesktop />
                </button>
            </TooltipTrigger>
            <TooltipContent
                className="w-[385px] 3xl:max-w-[310px] 2xl:max-w-[278px] h-full max-h-[100vh] m-0 bg-[#353652cc] rounded-[25px] shadow-none border-none"
                sideOffset={3}
                side="top"
                align="end"
                alignOffset={-20}
                arrowPadding={0}
                avoidCollisions={false}
                collisionPadding={{ top: 20, left: 20 }}
            >
                <div className="p-2 4xl:p-1.5 3xl:p-1.5 2xl:p-1.5 pt-2 3xl:pt-1 2xl:pt-1">
                    <p className="text-[15px] 3xl:text-[12px] 2xl:text-[12px] align-baseline font-medium 3xl:font-light 2xl:font-light text-white leading-[19px] text-mauve12">
                        {tooltipMessage}
                    </p>
                </div>
                <TooltipArrow className="h-2 fill-[#353652cc] transform: translateY(-1px)" />
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)

export const HelpTooltipMobi: React.FC<HelpTooltipProps> = ({ tooltipMessage }) => (
    <Popover>
        <PopoverTrigger asChild>
            <button className="flex justify-self-start self-end mt-5 mr-5">
                <HelpIconMobi />
            </button>
        </PopoverTrigger>
        <PopoverContent
            className="min-w-[345px] sm_xl:max-w-[425px] sm_l:min-w-[332px] sm_s:min-w-[290px] sm:min-w-[100px] sm:w-min min-h-[96px] sm_s:min-h-[76px] sm:min-h-[76px] m-auto p-1.5 sm:p-1 bg-[#353652cc] rounded-[25px] shadow-none border-none will-change-auto"
            sideOffset={3}
            side="top"
            align="end"
            alignOffset={-20}
            arrowPadding={0}
            avoidCollisions={false}
            collisionPadding={{ top: 20, left: 20 }}
        >
            <div className="p-2 sm:p-1 sm:px-1.5 sm:w-[200px]">
                <p className="text-[15px] sm_s:text-[12px] sm:text-[12px] align-baseline font-medium text-white leading-[19px] sm:leading-[17px] text-mauve12">
                    {tooltipMessage}
                </p>
            </div>
            <PopoverArrow className="h-2 fill-[#353652cc]" />
        </PopoverContent>
    </Popover>
)

export const TrashTooltipDesktop: React.FC<HelpTooltipProps> = ({ tooltipMessage }) => (
    <TooltipProvider delayDuration={200}>
        <Tooltip>
            <TooltipTrigger asChild>
                <button>
                    <TrashIcon />
                </button>
            </TooltipTrigger>
            <TooltipContent
                className="w-[201px] m-0 bg-[#353652cc] rounded-[25px] shadow-none border-none"
                sideOffset={3}
                side="bottom"
                align="start"
                alignOffset={0}
                arrowPadding={0}
                avoidCollisions={false}
                collisionPadding={{ top: 10, left: 20 }}
            >
                <div className="p-2 4xl:p-1.5 3xl:p-1.5 2xl:p-1.5 pt-2 3xl:pt-1 2xl:pt-1">
                    <p className="text-[15px] 3xl:text-[12px] 2xl:text-[12px] align-baseline font-medium 3xl:font-light 2xl:font-light text-white leading-[19px] text-mauve12">
                        {tooltipMessage}
                    </p>
                </div>
                <TooltipArrow className="h-2 fill-[#353652cc] transform: translateY(-1px)" />
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
)
