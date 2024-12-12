import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground hover:bg-primary/90',
                destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
                outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
                secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
                select_desktop:
                    'button-border-desktop rounded-[50px] text-[20px] font-semibold text-white hover:bg-gradient-desktop',
                select_mobi: 'button-border-mobi rounded-[50px] border-2 border-transparent bg-[#101030] text-white',
                accent_desktop: 'flex items-center justify-center rounded-[50px] bg-white',
                accent_mobi: 'flex items-center rounded-[50px] bg-white',
                registration:
                    'w-[500px] rounded-[45px] bg-white text-13xl font-semibold hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8] lg:text-9xl',
                registration_mobi:
                    'h-[51px] w-[269px] rounded-[38px] bg-white font-semibold hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                arrow: 'w-[95px] rounded-[45px] bg-white hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                arrow_mobi:
                    'flex size-[51px] items-center justify-center rounded-full bg-white hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                header_desktop_btn_gradient:
                    'rounded-[50px] bg-gradient-desktop text-white hover:bg-gradient-desktop-hover',
                circle: 'rounded-[50%] bg-card',
                circleBlue: 'rounded-[50%] bg-[#382D90]',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                four_xl: 'h-[95px]',
                promo_mobi: 'h-[51px]',
                select_mobi: 'h-[40px] w-full max-w-[188px] ',
                btn_modal_desktop: 'h-12 max-w-[272px] rounded-md',
                btn_modal_mobi: 'h-11 max-w-[272px] rounded-md',
                icon: 'size-10',
                wide_desktop: 'h-[4.25rem] px-[30px] 2xl:h-12 3xl:h-14',
                wide_mobi: 'h-[3.125rem] rounded-[38px] sm:h-[2.375rem] sm_s:h-[2.3rem] sm_l:h-[2.85rem] sm_xl:h-12',
                circle_desktop: 'aspect-square h-[4.25rem] p-[16px] 2xl:h-12 2xl:p-[12px] 3xl:h-14 3xl:p-[14px]',
                circle_mobi:
                    'aspect-square h-[3.125rem] p-[12px] sm:h-[2.375rem] sm:p-[10px] sm_s:h-[2.3rem] sm_s:p-[10px] sm_l:h-[2.85rem] sm_xl:h-12',
                header_btn:
                    'px-[80px] py-[16px] text-7.5xl md:text-xs lg:px-[1vw] lg:py-[9px] lg:text-xs xl:px-[1.5vw] xl:py-[12px] xl:text-xl 2xl:px-[2vw] 2xl:py-[14px] 2xl:text-3xl 3xl:px-[2vw] 3xl:py-[15px] 3xl:text-4xl 4xl:px-[3vw] 4xl:py-[19px] 4xl:text-6xl',
                select_mobi_menu: 'h-[47px] w-full max-w-[195px] text-3xl hover:bg-gradient-mobi-menu',
                gradient_border_btn: 'h-[64px] w-[272px] 2xl:h-[58px] 2xl:w-[250px]',
                circleDesk: 'size-[68px]',
                circleMobi: 'size-[55px] sm:size-[50px] sm_s:size-[52px]',
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
