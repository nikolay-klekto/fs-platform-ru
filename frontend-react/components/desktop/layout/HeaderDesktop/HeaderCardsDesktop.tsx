'use client'

import React from 'react'
import HeaderCardItemDesktop from './HeaderCardItemDesktop'

const HeaderCardsDesktop: React.FC = () => {
    return (
        <>
            <div className="flex flex-col gap-[20px] md:gap-[12px] self-end pt-[104px] 2xl:pt-[75px]">
                <HeaderCardItemDesktop
                    textBlack="Стажировка"
                    textColor="наблюдателя"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                    time="неделя"
                />
                <HeaderCardItemDesktop
                    textBlack="Стажировка"
                    textColor="с участием в рабочих процессах"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                    time="неделя"
                />
            </div>
        </>
    )
}
export default HeaderCardsDesktop
