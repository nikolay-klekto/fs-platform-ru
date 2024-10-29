'use client'

import React from 'react'
import { content } from './content'
import { ArrowWhiteMobi } from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'

const HeaderCardsMobi: React.FC = () => {
    return (
        <>
            <div className="flex flex-col gap-[20px] p-[14px] ">
                {content.map((item) => (
                    <div
                        className="flex flex-1 flex-col justify-center gap-[30px] bg-[url('/background/subtract_mobi.svg')] bg-no-repeat px-[30px] drop-shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] bg-auto bg-contain w-[100%] items-center min-h-[212px] "
                        key={item.id}
                    >
                        <div className="text-5xl font-medium text-white">
                            {item.textBlack}{' '}
                            <span className="text-white font-bold leading-[32px] bg-sub-title-gradient-mobi20 rounded-[20px] px-[4px]">
                                {item.textColor}{' '}
                            </span>
                            {item.textBlackBr}
                        </div>
                        <div className="text-white text-9xl font-medium">
                            {item.price} {item.currency}
                        </div>
                        <Button variant="circleBlue" size="circleMobi" className="absolute bottom-0 right-0">
                            <ArrowWhiteMobi />
                        </Button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default HeaderCardsMobi
