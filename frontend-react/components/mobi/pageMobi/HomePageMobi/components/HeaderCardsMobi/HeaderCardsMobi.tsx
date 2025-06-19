'use client'

import React from 'react'
import HeaderCardsItemMobi from './ItemHeaderCardsMobi/HeaderCardsItemMobi'

const HeaderCardsMobi: React.FC = () => {
    return (
        <>
            <div className="flex flex-row flex-wrap gap-[20px] px-[15px] pt-[20px] md:px-[30px]">
                <HeaderCardsItemMobi
                    textBlack="Стажировка"
                    textColor="наблюдателя"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                    tooltipMessage="Вы получаете стажировку наблюдателя, но с рабочими задачами под ваш уровень и человеком, который в случае чего поможет подтянуть знания"
                    disableCurrencyTranslation={true}
                />
                <HeaderCardsItemMobi
                    textBlack="Стажировка"
                    textColor="с участием в рабочих процессах"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                    tooltipMessage="На стажировке вас ждет ментор, обзорные экскурсии и рабочее место, без необходимости работать"
                    disableCurrencyTranslation={true}
                />
            </div>
        </>
    )
}
export default HeaderCardsMobi
