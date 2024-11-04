'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ForwardIcon } from '@/components/assets/icons'

interface HeaderCardItemDesktop {
    textBlack: string
    textColor: string
    textBlackBr: string
    price: number
    currency: string
    time: string
}

const HeaderCardItemDesktop: React.FC<HeaderCardItemDesktop> = ({
    textBlack,
    textColor,
    textBlackBr,
    price,
    currency,
    time,
}) => {
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => {
        setIsHovered(true)
    }

    const handleMouseLeave = () => {
        setIsHovered(false)
    }

    return (
        <>
            <div
                className="flex min-h-[260px] w-[426px] flex-1 flex-col justify-between gap-[17px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:min-h-[140px] md:max-w-[230px] md:gap-[18px] 3xl:min-h-[198px] 3xl:w-[324px] 2xl:min-h-[188px] 2xl:w-[308px] xl:min-h-[184px] xl:w-[302px] lg:min-h-[160px] lg:w-[262px]"
                style={{
                    backgroundImage: "url('/background/subtract_desk.svg')",
                    backgroundSize: 'contain, contain',
                    backgroundPosition: 'center, rigth',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className=" grow px-10 md:px-4 lg:px-6 xl:px-7 pt-[36px] 3xl:pt-[26px] 3xl:px-7 2xl:pt-[26px] 2xl:px-5 lg:pt-[22px] ">
                    <div className="text-7xl font-medium md:text-2xl md:font-light lg:text-3xl xl:text-3xl text-justify leading-[40px] md:leading-[8px] lg:leading-[20px] 3xl:leading-[24px] 3xl:text-4xl 2xl:leading-[24px] 2xl:text-4xl xl:leading-[24px] ">
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
                <div className="grow flex justify-between pl-10 md:pl-4 lg:pl-6 xl:pl-7 3xl:pl-7 2xl:pl-5">
                    <div
                        className="bg-gradient-desktop text-5xl font-semibold md:text-2xl xl:text-4xl"
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        от{' '}
                        <span className="text-11xl font-medium md:text-3xl lg:text-4xl xl:text-5xl 3xl:text-6xl 2xl:text-6xl">
                            {price} {currency}/ {time}
                        </span>
                    </div>
                    <Button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        variant="accent_desktop"
                        size="circleDesk"
                        className={`${isHovered ? 'button-shadow_right_desktop_custom' : ''} self-end 3xl:size-[52px] 2xl:size-[52px] lg:size-[46px] xl:size-[50px]`}
                    >
                        <ForwardIcon className="lg:h-[18px] lg:w-[21px] xl:h-[21px] xl:w-[24px]" />
                    </Button>
                </div>
            </div>
        </>
    )
}
export default HeaderCardItemDesktop
