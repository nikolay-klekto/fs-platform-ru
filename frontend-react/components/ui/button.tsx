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
                select_desktop:
                    'button-border-desktop hover:bg-gradient-desktop rounded-[50px] text-[20px] font-semibold text-white',
                select_mobi: 'button-border-mobi rounded-[50px] border border-transparent bg-[#101030] text-white',
                accent_desktop: 'flex items-center justify-center rounded-[50px] bg-white',
                accent_mobi: 'flex items-center rounded-[50px] bg-white',
                registration:
                    'text-13xl w-[500px] rounded-[45px] bg-white font-semibold hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8] lg:text-9xl',
                registration_mobi:
                    'rounded-full bg-white px-4 py-2 font-semibold hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                arrow: 'w-[95px] rounded-[45px] bg-white hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                arrow_mobi:
                    'flex items-center justify-center rounded-full bg-white p-2 hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                header_desktop_btn_gradient:
                    'bg-gradient-desktop hover:bg-gradient-desktop-hover rounded-[50px] text-white',
                circle: 'bg-card rounded-[50%]',
                circleBlue: 'rounded-[50%] bg-[#382D90]',
                select_btn_mobi: 'button-border-mobi rounded-[50px] border-transparent bg-[#101030] text-white',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                four_xl: 'h-[95px]',
                promo_mobi: 'h-[40px]',
                select_mobi: 'h-[40px] w-full max-w-[188px] ',
                btn_modal_desktop: 'h-12 max-w-[272px] rounded-md',
                btn_modal_mobi: 'h-11 max-w-[272px] rounded-md',
                icon: 'size-10',
                wide_desktop: '3xl:h-14 h-[4.25rem] px-[30px] 2xl:h-12',
                wide_mobi: 'sm_l:h-[2.85rem] sm_s:h-[2.3rem] sm_xl:h-12 h-[3.125rem] rounded-[38px] sm:h-[2.375rem]',
                circle_desktop: '3xl:h-14 3xl:p-[14px] aspect-square h-[4.25rem] p-[16px] 2xl:h-12 2xl:p-[12px]',
                circle_mobi:
                    'sm_l:h-[2.85rem] sm_s:h-[2.3rem] sm_xl:h-12 sm_s:p-[10px] aspect-square h-[3.125rem] p-[12px] sm:h-[2.375rem] sm:p-[10px]',
                header_btn:
                    'text-7.5xl px-[80px] py-[16px] 4xl:text-6xl 4xl:px-[3vw] 4xl:py-[19px] 3xl:text-4xl 3xl:px-[2vw] 3xl:py-[15px] 2xl:text-3xl 2xl:px-[2vw] 2xl:py-[14px] md:text-xs lg:px-[1vw] lg:py-[9px] lg:text-xs xl:px-[1.5vw] xl:py-[12px] xl:text-xl',
                select_mobi_menu: 'text-3xl hover:bg-gradient-mobi-menu h-[47px] w-full max-w-[195px]',
                gradient_border_btn: 'h-[64px] w-[272px] 2xl:h-[58px] 2xl:w-[250px]',
                circleDesk: 'size-[68px]',
                circleMobi: 'sm_s:size-[52px] size-[55px] sm:size-[50px]',
                contacts_btn_desktop: 'h-[65px] w-[262px]',
                contacts_btn_send_desktop: 'h-[68.5px] w-[289px]',
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
