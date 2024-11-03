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
                className="flex min-h-[260px] w-[426px] flex-1 flex-col justify-between gap-[17px] drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:min-h-[140px] md:max-w-[230px] md:gap-[18px] lg:min-h-[190px] lg:max-w-[312px] xl:min-h-[210px] xl:max-w-[346px] "
                style={{
                    backgroundImage: "url('/background/subtract_desk.svg')",
                    backgroundSize: 'contain, contain',
                    backgroundPosition: 'rigth, center',
                    backgroundRepeat: 'no-repeat, no-repeat',
                }}
            >
                <div className="px-10 md:px-4 lg:px-6 xl:px-7 pt-[36px] 3xl:pt-[26px] ">
                    <div className="text-7xl font-medium md:text-2xl md:font-light lg:text-4xl xl:text-3xl text-justify  leading-[40px] md:leading-[8px] lg:leading-[20px] ">
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
                <div className="flex justify-between pl-10 md:pl-4 lg:pl-6 xl:pl-7 ">
                    <div
                        className="bg-gradient-desktop text-5xl font-semibold md:text-2xl xl:text-4xl pb-[48px] 3xl:pb-[32px]"
                        style={{
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        от{' '}
                        <span className="text-11xl font-medium md:text-3xl lg:text-6xl xl:text-8xl">
                            {price} {currency}/ {time}
                        </span>
                    </div>
                    <Button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        variant="accent_desktop"
                        size="circle_desktop"
                        className={`${isHovered ? 'button-shadow_right_desktop_custom' : ''} self-end`}
                    >
                        <ForwardIcon className="lg:h-[18px] lg:w-[21px] xl:h-[21px] xl:w-[24px]" />
                    </Button>
                </div>
            </div>
        </>
    )
}
export default HeaderCardItemDesktop
