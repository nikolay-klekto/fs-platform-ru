'use client'

import React from 'react'
import { content } from './content'
import { ArrowWhiteMobi } from '@/components/assets/iconsMobi'
import { Button } from '@/components/ui/button'

const HeaderCardsMobi: React.FC = () => {
    return (
        <>
            <div className="sm_l:max-w-[95vw] sm_l:p-[0.5vw] m-auto flex max-w-[374px] flex-col gap-[20px] p-[14px] sm:px-[4vw]">
                {content.map((item) => (
                    <div
                        className="flex min-h-[212px] flex-1 flex-col items-center justify-center gap-[30px] bg-[url('/background/subtract_mobi.svg')] bg-contain bg-no-repeat px-[30px] drop-shadow-[0_3.26px_3.26px_rgba(0,0,0,0.25)] sm:min-h-[180px]"
                        key={item.id}
                    >
                        <div className="text-5xl font-medium leading-[32px] text-white sm:text-3xl sm:leading-[24px]">
                            {item.textBlack}{' '}
                            <span className="bg-sub-title-gradient-mobi20 rounded-[20px] px-[4px] font-bold text-white">
                                {item.textColor}{' '}
                            </span>
                            {item.textBlackBr}
                        </div>
                        <div className="text-9xl font-medium text-white sm:text-7xl">
                            {item.price} {item.currency}
                        </div>
                        <Button
                            variant="circleBlue"
                            size="circleMobi"
                            className="absolute bottom-0 right-0 sm:size-[50px]"
                        >
                            <ArrowWhiteMobi />
                        </Button>
                    </div>
                ))}
            </div>
        </>
    )
}
export default HeaderCardsMobi
