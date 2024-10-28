'use client'

import React from 'react'
import { content } from './content'
import { ArrowGradientDesktop } from '@/components/assets/iconsDesktop'

const HeaderCardsDesktop: React.FC = () => {
    return (
        <>
            <div className="flex justify-between pt-[220px] ">
                <div>hfelfh</div>
                <div className="flex flex-col gap-[20px] p-[61px]">
                    {content.map((item) => (
                        <div
                            className="flex min-h-[260px] max-w-[426px] flex-1 flex-col justify-center gap-[26px] bg-[url('/background/subtract_desk.svg')] px-10 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                            key={item.id}
                        >
                            <div className="text-[24px] font-medium">
                                {item.textBlack}{' '}
                                <span
                                    className="color-gradient-blue font-bold leading-[40px]"
                                    style={{
                                        background:
                                            'linear-gradient(90deg, rgb(131, 51, 243), rgb(95, 74, 243), rgb(59, 81, 168))',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    {item.textColor}{' '}
                                </span>
                                {item.textBlackBr}
                            </div>
                            <div
                                className="text-[21.12px] font-semibold"
                                style={{
                                    background:
                                        'linear-gradient(90deg, rgb(131, 51, 243), rgb(95, 74, 243), rgb(59, 81, 168))',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                от{' '}
                                <span className="text-[31.68px] font-medium">
                                    {item.price} {item.currency}/ {item.time}
                                </span>
                            </div>
                            <button className="bg-card absolute bottom-0 right-0 flex size-[68px] items-center justify-center rounded-[50%] hover:bg-black">
                                <ArrowGradientDesktop />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
export default HeaderCardsDesktop
