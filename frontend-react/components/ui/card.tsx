import * as React from 'react'

import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const cardVariants = cva('rounded-full border-none', {
    variants: {
        variant: {
            default: '',
            profession_page_desktop: 'relative flex flex-col justify-between border-none bg-cover bg-center',
            profession_page_mobi: 'flex flex-col justify-between border-none bg-cover bg-center bg-no-repeat',
        },
        size: {
            default: '',
            profession_page_desktop: '', //заполнить
            profession_page_mobi:
                'aspect-[165/194] w-[165px] max-w-[210px] flex-shrink flex-grow overflow-hidden rounded-[24px] px-[10px] py-[12px] md:aspect-[165/194] md:w-[185px]',
        },
        rounded: {
            default: 'rounded-[50px]',
            none: 'rounded-none',
            full: 'rounded-full',
            rounded_24px: 'rounded-[24px]',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        rounded: 'default',
    },
})

const cardTitleVariants = cva('font-medium', {
    variants: {
        variant: {
            default: '',
            profession_page_desktop:
                '4xl:text-6xl 3xl:text-5xl bg-white bg-opacity-[70%] text-7xl font-medium text-[#101030] 2xl:text-4xl',
            profession_page_mobi: 'bg-white bg-opacity-[70%] text-[12px] font-medium text-[#101030]',
        },
        size: {
            default: 'text-[24px]',
            profession_page_desktop:
                '3xl:px-[15px] 4xl:px-[15px] 4xl:max-w-full w-fit max-w-full truncate rounded-[25px] px-[20px] py-[2px] 2xl:px-[10px]',
            profession_page_mobi: 'h-[20px] w-fit max-w-full truncate px-[10px]',
        },
        rounded: {
            default: 'rounded-[50px]',
            none: 'rounded-none',
            full: 'rounded-full',
            rounded_24px: 'rounded-[24px]',
            rounded_12px: 'rounded-[12px]',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        rounded: 'default',
    },
})

const cardFooterVariants = cva('', {
    variants: {
        variant: {
            default: '',
            profession_page_mobi: 'whitespace-nowrap bg-white font-medium',
        },
        size: {
            default: 'p-0',
            profession_page_desktop: 'pb-0 pl-0 2xl:px-0',
            profession_page_mobi: 'w-fit px-[10px] py-[2px]',
        },
        rounded: {
            default: 'rounded-[50px]',
            none: 'rounded-none',
            full: 'rounded-full',
            rounded_24px: 'rounded-[24px]',
            rounded_12px: 'rounded-[12px]',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        rounded: 'default',
    },
})

export interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, variant, size, rounded, ...props }, ref) => (
    <div ref={ref} className={cn(cardVariants({ variant, size, rounded }), className)} {...props} />
))
Card.displayName = 'Card'

export interface CardTitleProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof cardTitleVariants> {}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
    ({ className, variant, size, ...props }, ref) => (
        <h3 ref={ref} className={cn(cardTitleVariants({ variant, size }), className)} {...props} />
    ),
)
CardTitle.displayName = 'CardTitle'

export interface CardFooterProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardFooterVariants> {}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(({ className, variant, size, ...props }, ref) => (
    <div ref={ref} className={cn(cardFooterVariants({ variant, size }), className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
    ),
)
CardHeader.displayName = 'CardHeader'

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
    ({ className, ...props }, ref) => (
        <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
    ),
)
CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />,
)
CardContent.displayName = 'CardContent'

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
