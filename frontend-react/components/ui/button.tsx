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
                send_btn_desktop:
                    'button-border-desktop border-2 3xl:text-4xl rounded-[50px] text-[20px] font-semibold text-white  2xl:text-3xl',
                select_mobi: 'button-border-mobi rounded-[50px] border-2 border-transparent bg-[#101030] text-white',
                accent_desktop: 'flex items-center justify-center rounded-[50px] bg-white',
                accent_mobi: 'flex items-center rounded-[50px] bg-white',
                registration_desktop:
                    'text-12xl 3xl:text-8xl bg-white font-semibold hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8] 2xl:text-6xl',
                registration_mobi: 'bg-white font-semibold hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                arrow_registration_desktop: 'bg-white hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                arrow_registration_mobi:
                    'flex items-center justify-center bg-white hover:bg-white hover:shadow-lg hover:shadow-[#3B51A8]',
                header_desktop_btn_gradient:
                    'bg-gradient-desktop hover:bg-gradient-desktop-hover rounded-[50px] text-white',
                header_mobi_btn_gradient: 'bg-gradient-mobi rounded-[50px] text-white',
                circle_btn_gradient_desktop:
                    'bg-gradient-desktop hover:bg-gradient-desktop-hover absolute flex items-center justify-center rounded-[50px] text-white',
                circle_btn_mobi: 'absolute right-0 top-1/2 -translate-y-1/2',
                select_btn_desktop:
                    'button-border-desktop 3xl:text-4xl flex items-center gap-[20px] rounded-[50px] border-2 text-5xl font-semibold  2xl:text-3xl',
                circle: 'bg-gradient-desktop hover:bg-gradient-desktop-hover rounded-[50px] text-white',
                circleBlue: 'rounded-[50%] bg-[#382D90]',
                circleDarkBlue: 'rounded-[50%] bg-[#272744]',
                select_day: 'bg-gradient-desktop rounded-[90px] text-white',
                hover_button_date:
                    'hover:button-border-desktop-date 4xl:text-2xl 3xl:text-xl rounded-[90px] border border-[#878797] bg-[#1F203F] text-[18px] hover:bg-[#28295B] 2xl:text-lg',
                cancel_btn_desktop: 'text-[20px] font-semibold text-[#878797] underline hover:text-white',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                arrow_registration_desktop: '3xl:size-[88px] size-[95px] rounded-full 2xl:size-[80px]',
                registration_desktop:
                    '3xl:w-[376px] 3xl:h-[88px] h-[95px] w-[500px] rounded-[45px] 2xl:h-[80px] 2xl:w-[323px] ',
                registration_mobi:
                    'h-[51px] rounded-full flex justify-center max-w-[270px] w-full md:max-w-[545px] md:py-[28px] py-2 md:h-[103px]',
                arrow_registration_mobi: 'size-[51px] md:size-[103px] rounded-full flex-shrink-0',
                select_mobi: 'h-[40px] md:h-[70px] md:max-w-[332px] w-full max-w-[188px] ',
                gradient_circle_mobi: 'aspect-square size-[44px] p-[10px]',
                btn_modal_desktop: 'h-12 max-w-[272px] rounded-md',
                btn_modal_mobi: 'h-11 max-w-[272px] rounded-md',
                icon: 'size-10',
                wide_desktop: '3xl:h-14 h-[4.25rem] px-[30px] 2xl:h-12',

                wide_mobi:
                    'h-[40px] min-w-[225px] sm_l:h-[50px] sm_l:min-w-[260px] sm_xl:h-[50px] sm_xl:min-w-[260px] md:h-[84px] md:w-full rounded-[38px]',

                circle_desktop: '3xl:h-14 3xl:p-[14px] aspect-square h-[4.25rem] p-[16px] 2xl:h-12 2xl:p-[12px]',

                circle_mobi:
                    'h-[40px] w-[40px] sm_l:h-[50px] sm_l:w-[50px] sm_xl:h-[50px] sm_xl:w-[50px] p-[10px] md:h-[84px] md:w-[84px] md:p-[17px] aspect-square',

                header_btn:
                    'text-7.5xl 3xl:px-[2vw] 3xl:py-[15px] 3xl:text-4xl 4xl:px-[3vw] 4xl:py-[19px] 4xl:text-6xl max-h-[68px] px-[80px] py-[16px] 2xl:px-[2vw] 2xl:py-[14px] 2xl:text-3xl',
                select_mobi_menu: 'h-[47px] w-full max-w-[195px] text-3xl',
                send_btn_desktop: 'h-[64px] w-[272px] 2xl:w-[200px]',
                cookie_btn_desktop: '3xl:w-[250px] h-[64px] w-[237px]',
                circle_btn_gradient_desktop: 'right-0 top-1/2 size-[60px] -translate-y-1/2 rounded-full',
                circle_btn_mobi: 'h-0 px-[11px] py-0',
                gradient_btn_desktop: '3xl:w-[250px] h-[64px] w-[272px] 2xl:w-[250px]',
                select_btn_desktop:
                    '3xl:w-[300px] 3xl:px-[20px] h-[64px] w-[337px] px-[30px] py-[20px] 2xl:w-[270px] 2xl:px-[20px]',
                select_btn_desktop_events:
                    '3xl:w-[260px] 3xl:px-[20px] h-[64px] w-[290px] px-[30px] py-[20px] 2xl:w-[230px] 2xl:px-[20px]',
                select_btn_desktop_date:
                    '3xl:w-[180px] 3xl:px-[20px] h-[64px] w-[200px] px-[30px] py-[20px] 2xl:w-[160px] 2xl:px-[20px]',
                select_btn_type_internship_desktop:
                    '3xl:w-[250px] 3xl:px-[20px] h-[64px] w-[281px] p-[20px] 2xl:w-[214px] 2xl:px-[12px]',
                circleDesk: 'size-[68px]',
                circleMobi: 'sm_s:size-[52px] size-[55px] sm:size-[50px]',
                contacts_btn_desktop: '3xl:h-[62px] 3xl:w-[256px] h-[65px] w-[262px] 2xl:h-[59px] 2xl:w-[250px]',
                contacts_btn_send_desktop: 'h-[68.5px] w-[289px] 2xl:h-[62px] 2xl:w-[277px] 3xl:h-[65px] 3xl:w-[283px]',
                contacts_btn_mobi: 'h-[39.5px] w-[159px] flex-shrink-0 sm:w-[152px] sm_s:w-[156px]',
                contacts_btn_send_mobi: 'h-[35px] w-[145px] flex-shrink-0 sm:w-[136px] sm_s:w-[140px]',
                circle_modal_desk: 'size-[54px]',
                hover_button_date_desktop:
                    'h-[50px] w-[400px] px-[30px] py-[20px] 2xl:w-[240px] 2xl:px-[20px] 3xl:w-[270px] 3xl:px-[20px]',
                confirm_btn_desktop: 'h-[64px] w-[250px]',
                join_team_btn_desktop: 'h-[100px] w-[430px]',
                join_team_btn_mobi: 'h-[44px] w-[187px]',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    },
)

export interface IButton extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, IButton>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : 'button'
        return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    },
)
Button.displayName = 'Button'

export { Button, buttonVariants }
