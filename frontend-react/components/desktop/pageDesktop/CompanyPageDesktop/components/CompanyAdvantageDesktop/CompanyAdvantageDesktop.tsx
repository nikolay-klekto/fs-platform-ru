'use client'

import React, { useRef } from 'react'
import { content } from './contentCompanyAdvantageDesktop/content'
import ItemCompanyAdvantageDesktop from './ItemCompanyAdvantageDesktop/ItemCompanyAdvantageDesktop'
import useScrollbarSync from '@/hooks/useScrollbarSync'

const CompanyAdvantageDesktop: React.FC = () => {
    const contentRef = useRef<HTMLDivElement>(null)
    const scrollbarRef = useRef<HTMLDivElement>(null)
    const { scrollContentWidth } = useScrollbarSync(contentRef, scrollbarRef)

    return (
        <>
            <div
                ref={contentRef}
                className="no-scrollbar_custom flex w-full select-none gap-[clamp(20px,_1.6vw,_32px)] overflow-x-scroll"
            >
                {content.map((item) => (
                    <ItemCompanyAdvantageDesktop
                        key={item.id}
                        question={item.question}
                        answer={item.answer}
                        onWidthChange={() => { }}
                    />
                ))}
            </div>
            <div className=" mb-[132px] mt-[52px] w-full">
                <div
                    ref={scrollbarRef}
                    className="scrollbar_custom relative mx-auto w-[65%] cursor-pointer overflow-x-scroll"
                >
                    <div
                        className="absolute h-2 min-w-[1000px] bg-transparent"
                        style={{ width: `${scrollContentWidth}px` }}
                    ></div>
                </div>
            </div>
        </>
    )
}

export default CompanyAdvantageDesktop
