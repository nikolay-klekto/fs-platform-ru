'use client'

import React from 'react'
import { ArrowWhiteMobi } from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'
import { HelpTooltipMobi } from '@/components/ui/tooltip'

interface IHeaderCardItem {
    textBlack: string
    textColor: string
    textBlackBr: string
    price: number
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
                className="sm_s:min-h-[192px] sm_xl:h-[226px] sm_xl:w-fit m-auto flex h-[200px] w-[346px] flex-col items-center justify-center rounded-[41px] drop-shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] sm:min-h-[176px]"
                style={{
                    backgroundImage: "url('/background/subtract_mobi.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'bottom right',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <HelpTooltipMobi tooltipMessage={tooltipMessage} />
                <div className="relative flex h-full w-full flex-col items-center justify-center gap-[17px] pb-8">
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="sm_s:text-3xl sm_s:leading-[24px] px-[30px] text-justify text-5xl font-medium leading-[32px] text-white sm:text-3xl sm:leading-[24px]">
                            {textBlack}{' '}
                            <span className="bg-sub-title-gradient-mobi20 rounded-[20px] px-[4px] font-bold text-white sm:px-[2px]">
                                {textColor}
                            </span>{' '}
                            {textBlackBr}
                        </div>
                        <div className="text28px_mobi font-medium text-white">
                            {price} <span translate={disableCurrencyTranslation ? 'no' : 'yes'}>{currency}</span>
                        </div>
                    </div>
                    <Button variant="circleBlue" size="circleMobi" className="absolute bottom-[4px] right-0">
                        <ArrowWhiteMobi />
                    </Button>
                </div>
            </div>
        </>
    )
}
export default HeaderCardsItemMobi
