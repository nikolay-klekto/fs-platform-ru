'use client'

import React from 'react'
import { content } from './content'
import { ArrowGradientDesktop } from '@/components/assets/iconsDesktop'
import { Button } from '@/components/ui/button'

const HeaderCardsDesktop: React.FC = () => {
    return (
        <>
            <div className="flex flex-col gap-[20px] md:gap-[12px]">
                {content.map((item) => (
                    <div
                        className="flex min-h-[260px] max-w-[426px] flex-1 flex-col justify-center gap-[26px] bg-[url('/background/subtract_desk.svg')] bg-contain bg-no-repeat px-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] md:min-h-[140px] md:max-w-[230px] md:gap-[18px] md:px-4 lg:min-h-[190px] lg:max-w-[312px] lg:px-6 xl:min-h-[210px] xl:max-w-[346px] xl:px-7"
                        key={item.id}
                    >
                        <div className="text-7xl font-medium md:text-2xl md:font-light lg:text-4xl xl:text-3xl">
                            {item.textBlack}{' '}
                            <span
                                className="bg-gradient-desktop font-bold leading-[40px] md:font-semibold md:leading-[8px] lg:leading-[20px] xl:leading-[20px]"
                                style={{
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {item.textColor}{' '}
                            </span>
                            {item.textBlackBr}
                        </div>
                        <div
                            className="bg-gradient-desktop text-5xl font-semibold md:text-2xl xl:text-4xl"
                            style={{
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            от{' '}
                            <span className="text-11xl font-medium md:text-3xl lg:text-6xl xl:text-8xl">
                                {item.price} {item.currency}/ {item.time}
                            </span>
                        </div>
                        <Button
                            variant="circle"
                            size="circleDesk"
                            className="absolute bottom-0 right-0 md:size-[40px] lg:size-[52px] xl:size-[58px]"
                        >
                            <ArrowGradientDesktop />
                        </Button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default HeaderCardsDesktop
