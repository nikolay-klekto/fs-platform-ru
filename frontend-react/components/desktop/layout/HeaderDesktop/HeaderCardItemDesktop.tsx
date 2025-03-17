'use client'

import { Button } from '@/components/ui/button'
import { ForwardIconDesktop } from '@/components/assets/icons'
import { HelpTooltipDesktop } from '@/components/ui/tooltip'

interface IHeaderCardItem {
    textBlack: string
    textColor: string
    textBlackBr: string
    price: number
    currency: string
    time: string
    tooltipMessage: string
}

const HeaderCardItemDesktop: React.FC<IHeaderCardItem> = ({
    textBlack,
    textColor,
    textBlackBr,
    price,
    currency,
    time,
    tooltipMessage,
}) => {
    return (
        <>
            <div className="card-foreground-image_desktop 3xl:min-h-[210px] 3xl:max-w-[346px] flex min-h-[260px] max-w-[426px] flex-col items-center justify-center rounded-[50px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] 2xl:min-h-[188px] 2xl:max-w-[308px]">
                <HelpTooltipDesktop tooltipMessage={tooltipMessage} />
                <div className="relative flex flex-1 flex-col items-start justify-items-stretch gap-[17px]">
                    <div className="3xl:px-7 px-10 2xl:px-5">
                        <div className="3xl:leading-[30px] text24px_desktop text-justify font-medium leading-[40px] 2xl:leading-[24px]">
                            {textBlack}{' '}
                            <span
                                className="bg-gradient-desktop font-bold  md:font-semibold"
                                style={{
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {textColor}{' '}
                            </span>
                            {textBlackBr}
                        </div>
                    </div>
                    <div
                        className="bg-gradient-desktop 3xl:pl-7 pl-10 text-5xl font-semibold md:text-2xl 2xl:pl-5"
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        от{' '}
                        <span className="text32px_desktop font-medium">
                            {price} {currency}/ {time}
                        </span>
                    </div>
                    <Button
                        variant="accent_desktop"
                        size="circle_desktop"
                        className="hover:button-shadow-arrow-around-desktop-custom absolute bottom-0 right-0"
                    >
                        <ForwardIconDesktop
                            fill="url(#paint0_linear_847_15423)"
                            stroke="url(#paint1_linear_847_15423)"
                        />
                    </Button>
                </div>
            </div>
        </>
    )
}
export default HeaderCardItemDesktop
