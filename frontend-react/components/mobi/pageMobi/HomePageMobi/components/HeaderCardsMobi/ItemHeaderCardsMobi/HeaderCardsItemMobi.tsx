'use client'

import React from 'react'
import { ArrowWhiteMobi } from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'
import { HelpTooltipMobi } from '@/components/ui/tooltip'

interface IHeaderCardItem {
    textBlack: string
    textColor: string
    textBlackBr: string
    price: number | null
    currency: string
    tooltipMessage: string
    disableCurrencyTranslation?: boolean
}

const HeaderCardsItemMobi: React.FC<IHeaderCardItem> = ({
    textBlack,
    textColor,
    textBlackBr,
    price,
    currency,
    tooltipMessage,
    disableCurrencyTranslation = true,
}) => {
    return (
        <>
            <div
                className="sm_s:min-h-[192px] sm_xl:h-[226px] sm_xl:w-fit relative m-auto flex min-h-[212px] w-[346px] flex-col items-center justify-center rounded-[40px] drop-shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] sm:min-h-[176px] md:w-full md:rounded-[68px] md:px-[clamp(12px,7vw,45px)] md:py-[clamp(22px,9vw,58px)]"
                style={{
                    backgroundImage: "url('/background/subtract_mobi.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'right bottom',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <HelpTooltipMobi tooltipMessage={tooltipMessage} />
                <div className="flex size-full flex-col items-center md:gap-6">
                    <div className="flex h-full flex-col items-center justify-center px-[28px] text-center md:px-4">
                        <div className="sm_s:text-3xl sm_s:leading-[24px] text-wrap text-left text-5xl font-medium leading-[32px] text-white sm:text-3xl sm:leading-[24px] md:mb-[clamp(10px,4vw,32px)] md:text-[clamp(20px,5vw,34px)] md:leading-[clamp(32px,7.2vw,54px)]">
                            {textBlack}{' '}
                            <span className="bg-sub-title-gradient-mobi20 rounded-[20px] px-[4px] font-bold text-white sm:px-[2px]">
                                {textColor}
                            </span>{' '}
                            {textBlackBr}
                        </div>
                        <div className="text28px_mobi font-medium uppercase text-white md:text-[clamp(28px,7vw,46px)]">
                            от {price ? price : 'XX'}{' '}
                            <span translate={disableCurrencyTranslation ? 'no' : 'yes'}>{currency}</span>
                        </div>
                    </div>
                    <Button
                        variant="circleBlue"
                        size="circleMobi"
                        className="absolute bottom-0 right-0 md:size-[clamp(65px,15vw,100px)]"
                    >
                        <ArrowWhiteMobi className="size-[20px] md:size-[clamp(20px,7vw,40px)]" />
                    </Button>
                </div>
            </div>
        </>
    )
}
export default HeaderCardsItemMobi
