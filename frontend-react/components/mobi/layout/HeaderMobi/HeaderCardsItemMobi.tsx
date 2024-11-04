'use client'

import React from 'react'
import { ArrowWhiteMobi } from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'

interface HeaderCardItemDesktop {
    textBlack: string
    textColor: string
    textBlackBr: string
    price: number
    currency: string
    time: string
}

const HeaderCardsItemMobi: React.FC<HeaderCardItemDesktop> = ({
    textBlack,
    textColor,
    textBlackBr,
    price,
    currency,
    time,
}) => {
    return (
        <>
            <div className="flex min-h-[212px] flex-1 flex-col items-center justify-center gap-[30px] bg-[url('/background/subtract_mobi.svg')] bg-contain bg-no-repeat px-[30px] drop-shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] sm:min-h-[180px] sm_s:min-h-[194px] sm_s:mx-[0vw]">
                <div className="text-5xl font-medium leading-[32px] text-white sm:text-3xl sm:leading-[24px] sm_s:text-3xl sm_s:leading-[24px] sm_s:tracking-[0.8px] ">
                    {textBlack}{' '}
                    <span className="bg-sub-title-gradient-mobi20 rounded-[20px] px-[4px] font-bold text-white sm:px-[2px]">
                        {textColor}{' '}
                    </span>
                    {textBlackBr}
                </div>
                <div className="text-9xl font-medium text-white sm:text-7xl">
                    {price} {currency}
                </div>
                <Button
                    variant="circleBlue"
                    size="circleMobi"
                    className="absolute bottom-0 right-0 sm:size-[50px] sm_s:size-[52px]"
                >
                    <ArrowWhiteMobi />
                </Button>
            </div>
        </>
    )
}
export default HeaderCardsItemMobi
