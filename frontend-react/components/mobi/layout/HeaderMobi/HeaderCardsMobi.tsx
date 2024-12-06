'use client'

import React from 'react'
import HeaderCardsItemMobi from './HeaderCardsItemMobi'

const HeaderCardsMobi: React.FC = () => {
    return (
        <>
            <div className="flex flex-row flex-wrap gap-[20px] px-[15px] pt-[20px]">
                <HeaderCardsItemMobi
                    textBlack="Стажировка"
                    textColor="наблюдателя"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                />
                <HeaderCardsItemMobi
                    textBlack="Стажировка"
                    textColor="с участием в рабочих процессах"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                />
            </div>
        </>
    )
}
export default HeaderCardsMobi
