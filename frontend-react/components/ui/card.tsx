import * as React from 'react'

import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const cardVariants = cva('border-none', {
    variants: {
        variant: {
            default: '',
            profession_home_desktop:
                'hover:button-shadow_around_desktop_custom flex cursor-pointer flex-col justify-between border-none bg-cover bg-center',
            profession_home_mobi: 'flex shrink-0 grow-0 flex-col justify-between bg-cover bg-center',
            profession_page_desktop:
                'hover:button-shadow_around_desktop_custom relative flex cursor-pointer flex-col justify-between border-none bg-cover bg-center',
            profession_page_mobi: 'flex flex-col justify-between border-none bg-cover bg-center bg-no-repeat',
        },
        size: {
            default: '',
            profession_home_desktop:
                '3xl:px-[20px] 3xl:py-[15px] aspect-[426/520] px-[30px] py-[20px] 2xl:px-[15px] 2xl:py-[10px]',
            profession_home_mobi:
                'sm_xl:w-[320px] sm_l:w-[300px] sm_s:w-[280px] aspect-[5/6] w-[320px] p-[20px] sm:w-[260px]',
            profession_page_desktop:
                'aspect-[340/400] w-[340px] max-w-full  px-[20px] py-[25px] 2xl:px-[15px] 2xl:py-[20px]',
            profession_page_mobi:
                'aspect-[164/193] w-[164px] max-w-[210px] flex-shrink flex-grow overflow-hidden rounded-[24px] px-[10px] py-[12px] md:aspect-[164/193] md:w-[185px]',
        },
        rounded: {
            default: 'rounded-[50px]',
            none: 'rounded-none',
            full: 'rounded-full',
            rounded_38: 'rounded-[38px]',
            rounded_24: 'rounded-[24px]',
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
            profession_home_desktop:
                'text30px_desktop bg-white bg-opacity-[70%] font-semibold tracking-normal text-[#101030]',
            profession_home_mobi:
                'text22px_mobi bg-white bg-opacity-[70%] font-semibold tracking-normal text-[#101030]',
            profession_page_desktop:
                '4xl:text-6xl 3xl:text-5xl truncate bg-white bg-opacity-[70%] text-7xl font-medium text-[#101030] 2xl:text-4xl',
            profession_page_mobi: 'bg-white bg-opacity-[70%] text-[13px] font-medium text-[#101030]',
        },
        size: {
            default: 'text-[24px]',
            profession_home_desktop: 'w-fit px-[20px] py-[10px]',
            profession_home_mobi: 'w-fit px-[15px] py-[10px] ',
            profession_page_desktop:
                '3xl:px-[15px] 4xl:px-[15px] 4xl:max-w-full w-fit max-w-full  rounded-[25px] px-[20px] py-[2px] 2xl:px-[10px]',
            profession_page_mobi: 'w-fit max-w-full truncate px-[10px] py-[3px]',
        },
        rounded: {
            default: 'rounded-[50px]',
            none: 'rounded-none',
            full: 'rounded-full',
            rounded_38: 'rounded-[38px]',
            rounded_25: 'rounded-[25px]',
            rounded_24: 'rounded-[24px]',
            rounded_12: 'rounded-[12px]',
        },
    },
    defaultVariants: {
        variant: 'default',
        size: 'default',
        rounded: 'default',
    },
})

const cardFooterVariants = cva('p-0', {
    variants: {
        variant: {
            default: '',
            profession_home_desktop: 'whitespace-nowrap bg-white bg-opacity-[100] font-medium ',
            profession_home_mobi: 'bg-white bg-opacity-[100%] font-medium',
            profession_page_desktop: 'whitespace-nowrap bg-white font-medium',
            profession_page_mobi: 'whitespace-nowrap bg-white font-medium',
        },
        size: {
            default: '',
            profession_home_desktop: 'w-fit px-[15px] py-[5px] pb-3 2xl:px-[10px]',
            profession_home_mobi: 'w-fit px-[15px] py-[5px]',
            profession_page_desktop:
                '4xl:px-[15px] 3xl:px-[15px] 4xl:py-[4px] 3xl:py-[2px] w-fit px-[20px] py-[5px] 2xl:px-[10px] 2xl:py-0',
            profession_page_mobi: 'w-fit px-[10px] py-[2px]',
        },
        rounded: {
            default: 'rounded-[50px]',
            none: 'rounded-none',
            full: 'rounded-full',
            rounded_38: 'rounded-[38px]',
            rounded_25: 'rounded-[25px]',
            rounded_24: 'rounded-[24px]',
            rounded_12: 'rounded-[12px]',
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
    ({ className, variant, children, size, ...props }, ref) => (
        <h3 ref={ref} className={cn(cardTitleVariants({ variant, size }), className)} {...props}>
            {children}
        </h3>
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
