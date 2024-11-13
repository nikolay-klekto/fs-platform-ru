'use client'

import React, { useState, useRef, useEffect } from 'react'
import TitleMobi from '@/components/mobi/shared/TitleMobi'
import ProfessionCardMobi from './ProfessionCardMobi'
import ProfessionSearchFieldMobi from './ProfessionSearchFieldMobi'
import { content } from '@/components/desktop/layout/ProfessionsSectionDesktop/content'

interface ProfessionsSectionMobiProps {
    cardsToShow?: number
}

const ProfessionsSectionMobi: React.FC<ProfessionsSectionMobiProps> = ({ cardsToShow = 4 }) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const [cardWidth, setItemWidth] = useState<number>(0)

    const handleScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            scrollbarRef.current.scrollLeft = contentRef.current.scrollLeft
        }
    }

    const handleScrollbarScroll = () => {
        if (contentRef.current && scrollbarRef.current) {
            contentRef.current.scrollLeft = scrollbarRef.current.scrollLeft
        }
    }

    const scrollbarWidth = `${((content.length * cardWidth) / window.innerWidth) * 100}%`

    return (
        <div className="sm_xl:pt-[35px] sm_l:pt-[25px] sm_s:pt-[15px] sm_l:gap-[20px] sm_s:gap-[20px] flex max-w-full flex-col gap-[30px] px-[15px] py-[60px] sm:gap-[15px] sm:pt-[15px]">
            <TitleMobi title={'Профессии'} href={'#'} />
            <div className="flex items-center justify-between">
                <p className="sm_xl:text-4xl sm_l:text-3xl mb-[20px] text-[20px] font-semibold text-[#878797] md:text-5xl">
                    Наиболее популярные на нашем сервисе
                </p>
            </div>
            <div
                ref={contentRef}
                onScroll={handleScroll}
                className="no-scrollbar_custom flex select-none gap-[12px] overflow-x-scroll"
            >
                {content.slice(0, cardsToShow).map((item) => (
                    <ProfessionCardMobi
                        key={item.id}
                        image={item.image}
                        profession={item.profession}
                        price={item.price.toString()}
                        onWidthChange={setItemWidth}
                    />
                ))}
            </div>
            <div
                ref={scrollbarRef}
                onScroll={handleScrollbarScroll}
                className="scrollbar_custom mx-auto h-[2px] w-full overflow-y-hidden overflow-x-scroll py-[20px]"
            >
                <div className="h-full" style={{ width: scrollbarWidth }}></div>
            </div>
            <ProfessionSearchFieldMobi />
        </div>
    )
}

export default ProfessionsSectionMobi
