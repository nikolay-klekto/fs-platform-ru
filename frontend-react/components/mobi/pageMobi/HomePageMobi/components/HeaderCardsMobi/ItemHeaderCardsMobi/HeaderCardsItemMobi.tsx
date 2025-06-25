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
                className="md:p-[55px] md:w-full md:min-h-[450px] sm_s:min-h-[192px] relative sm_xl:h-[226px] sm_xl:w-fit m-auto flex min-h-[212px] w-[346px] flex-col items-center justify-center rounded-[41px] drop-shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] sm:min-h-[176px]"
                style={{
                    backgroundImage: "url('/background/subtract_mobi.webp')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <HelpTooltipMobi tooltipMessage={tooltipMessage} />
                <div className="flex h-full w-full flex-col items-center gap-[17px]">
                    <div className="flex h-full flex-col items-center justify-between text-center">
                        <div className="sm_s:text-3xl sm_s:leading-[24px] md:text-11xl px-[30px] text-wrap text-5xl font-medium leading-[32px] text-white sm:text-3xl sm:leading-[24px]">
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
                    <Button
                        variant="circleBlue"
                        size="circleMobi"
                        className="absolute bottom-0 right-0 md:w-20 md:h-20"
                    >
                        <ArrowWhiteMobi />
                    </Button>
                </div>
            </div>
        </>
    )
}
export default HeaderCardsItemMobi
