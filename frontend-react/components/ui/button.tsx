import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                select_mobi: 'button-border-mobi rounded-[50px] border border-transparent bg-[#101030] text-white',
                accent_desktop: 'flex items-center rounded-[50px] bg-white',
                accent_mobi: 'flex items-center rounded-[50px] bg-white',
                header_desktop_btn_gradient:
                    'bg-gradient-desktop rounded-[50px] text-white hover:bg-gradient-desktop-hover',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                select_mobi: 'h-[40px] w-full max-w-[188px] ',
                icon: 'size-10',
                wide_desktop: 'h-[68px] w-[358px] rounded-[50px] lg:h-[40px] lg:w-[200px] xl:h-[50px] xl:w-[280px]',
                wide_mobi: 'h-[50px] sm_l:h-[45px] sm:h-[38px] w-[271px] sm_l:w-[250px] sm:w-[230px] rounded-[38px]',
                circle_desktop: 'size-[68px] lg:size-[40px] xl:size-[50px]',
                circle_mobi: 'size-[50px] sm_l:size-[45px] sm:size-[38px]',
                header_btn:
                    'px-[80px] py-[19px] text-7.5xl 4xl:text-6xl 3xl:text-4xl 2xl:text-3xl xl:text-xl lg:text-xs md:text-xs 4xl:px-[2vw] 3xl:px-[2vw] 3xl:py-[12px] 2xl:px-[2vw] 2xl:py-[12px] xl:px-[1.5vw] xl:py-[12px] lg:px-[1vw] lg:py-[9px]',
                select_mobi_menu: 'h-[40px] w-full max-w-[188px] hover:bg-gradient-mobi-menu',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
