'use client'

import React from 'react'
import HeaderCardItemDesktop from './ItemHeaderCardsDesktop/HeaderCardItemDesktop'

const HeaderCardsDesktop: React.FC = () => {
    return (
        <>
            <div className="flex flex-col gap-[20px] self-end pt-[104px] md:gap-[12px] 2xl:pt-[75px]">
                <HeaderCardItemDesktop
                    textBlack="Стажировка"
                    textColor="наблюдателя"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                    time="неделя"
                    tooltipMessage="Вы получаете стажировку наблюдателя, но с рабочими задачами под ваш уровень и человеком, который в случае чего поможет подтянуть знания"
                />
                <HeaderCardItemDesktop
                    textBlack="Стажировка"
                    textColor="с участием в рабочих процессах"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                    time="неделя"
                    tooltipMessage="На стажировке вас ждет ментор, обзорные экскурсии и рабочее место, без необходимости работать"
                />
            </div>
        </>
    )
}
export default HeaderCardsDesktop
