'use client'

import React from 'react'
import HeaderCardsItemMobi from './HeaderCardsItemMobi'

const HeaderCardsMobi: React.FC = () => {
    return (
        <>
            <div className="sm_l:max-w-[95vw] sm_l:p-[0.5vw] m-auto flex max-w-[374px] flex-col gap-[20px] p-[14px] sm:px-[4vw] sm:w-auto">
                <HeaderCardsItemMobi
                    textBlack="Стажировка"
                    textColor="наблюдателя"
                    textBlackBr="для любой профессии"
                    price={123}
                    currency="BYN"
                    time="неделя"
                />
                <HeaderCardsItemMobi
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
export default HeaderCardsMobi
